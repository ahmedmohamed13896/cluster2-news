import {
  Component,
  OnInit,
  inject,
  signal,
  ViewChild,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsArticle } from '../../models/news-article.model';
import { NewsStateService } from '../../state/news-state.service';
import { NotificationService } from '../../core/notification.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationDialogComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  private state = inject(NewsStateService);
  private notificationService = inject(NotificationService);

  @ViewChild('restoreDialog') restoreDialog!: ConfirmationDialogComponent;

  articles: NewsArticle[] = [];
  isLoading = signal(true);
  isRestoring = signal(false);
  error = signal<string | null>(null);

  // Restore confirmation data
  articleToRestore = signal<{ id: number; title: string } | null>(null);

  // Computed message for restore confirmation
  restoreMessage = computed(() => {
    const article = this.articleToRestore();
    return article
      ? `Are you sure you want to restore '${article.title}'?`
      : 'Are you sure you want to restore this article?';
  });

  async ngOnInit() {
    await this.loadArchived();
  }

  async loadArchived() {
    try {
      this.error.set(null);
      this.articles = await this.state.loadArchived();
    } catch (error) {
      console.error('Failed to load archived articles:', error);
      const errorMessage =
        'Failed to load archived articles. Please try again.';
      this.error.set(errorMessage);
      this.notificationService.showError(errorMessage, 'Load Failed');
    } finally {
      this.isLoading.set(false);
    }
  }

  showRestoreConfirmation(article: NewsArticle) {
    this.articleToRestore.set({ id: article.id, title: article.title });
    this.restoreDialog.showModal();
  }

  async confirmRestore() {
    const article = this.articleToRestore();
    if (!article) return;

    try {
      this.isRestoring.set(true);
      this.error.set(null);
      await this.state.unarchiveNews(article.id);

      // Show success notification
      this.notificationService.showSuccess(
        `Article "${article.title}" has been restored successfully.`,
        'Article Restored'
      );

      // Refresh the archived articles list
      this.articles = await this.state.loadArchived();
      this.articleToRestore.set(null);
    } catch (error) {
      console.error('Failed to restore news:', error);
      const errorMessage = 'Failed to restore article. Please try again.';
      this.error.set(errorMessage);
      this.notificationService.showError(errorMessage, 'Restore Failed');
    } finally {
      this.isRestoring.set(false);
    }
  }

  cancelRestore() {
    this.articleToRestore.set(null);
  }

  async retryLoad() {
    this.isLoading.set(true);
    await this.loadArchived();
  }
}
