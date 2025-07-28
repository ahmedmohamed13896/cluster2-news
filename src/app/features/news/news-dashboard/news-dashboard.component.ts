import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsStateService } from '../../../state/news-state.service';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme.service';
import { NotificationService } from '../../../core/notification.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-news-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ConfirmationDialogComponent,
  ],
  styleUrls: ['./news-dashboard.component.scss'],
  templateUrl: './news-dashboard.component.html',
})
export class NewsDashboardComponent implements OnInit {
  private state = inject(NewsStateService);
  private themeService = inject(ThemeService);
  private notificationService = inject(NotificationService);

  @ViewChild('archiveDialog') archiveDialog!: ConfirmationDialogComponent;

  // ✅ use a signal for reactivity
  searchTerm = signal('');
  isLoading = signal(true);
  error = signal<string | null>(null);
  isArchiving = signal(false);

  // ✅ filtered computed using signal
  filteredNews = this.state.getFilteredNewsSignal(this.searchTerm);

  // ✅ Theme service signal
  isDarkMode = this.themeService.isDarkMode;

  // Archive confirmation data
  articleToArchive = signal<{ id: number; title: string } | null>(null);

  // Computed message for archive confirmation
  archiveMessage = computed(() => {
    const article = this.articleToArchive();
    return article
      ? `Are you sure you want to archive '${article.title}'?`
      : 'Are you sure you want to archive this article?';
  });

  ngOnInit() {
    this.loadNews();
  }

  // ✅ helper to bind ngModel correctly
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  // ✅ Show archive confirmation dialog
  showArchiveConfirmation(article: { id: number; title: string }) {
    this.articleToArchive.set(article);
    this.archiveDialog.showModal();
  }

  // ✅ Archive news article with confirmation
  async confirmArchive() {
    const article = this.articleToArchive();
    if (!article) return;

    try {
      this.isArchiving.set(true);
      this.error.set(null);
      await this.state.archiveNews(article.id);

      // Show success notification
      this.notificationService.showSuccess(
        `Article "${article.title}" has been archived successfully.`,
        'Article Archived'
      );

      this.articleToArchive.set(null);
    } catch (error) {
      console.error('Failed to archive news:', error);
      const errorMessage = 'Failed to archive article. Please try again.';
      this.error.set(errorMessage);
      this.notificationService.showError(errorMessage, 'Archive Failed');
    } finally {
      this.isArchiving.set(false);
    }
  }

  // ✅ Cancel archive action
  cancelArchive() {
    this.articleToArchive.set(null);
  }

  // ✅ Retry loading news
  async retryLoad() {
    this.isLoading.set(true);
    this.error.set(null);
    await this.loadNews();
  }

  private async loadNews() {
    try {
      this.error.set(null);
      await this.state.loadNews();
    } catch (error) {
      console.error('Failed to load news:', error);
      const errorMessage = 'Failed to load news articles. Please try again.';
      this.error.set(errorMessage);
      this.notificationService.showError(errorMessage, 'Load Failed');
    } finally {
      this.isLoading.set(false);
    }
  }
}
