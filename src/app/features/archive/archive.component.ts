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
  template: `
    <section class="archive container">
      <h2 class="section-title mb-4">Archived News</h2>

      <!-- Error State -->
      <div
        *ngIf="error()"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Error:</strong> {{ error() }}
        <button
          type="button"
          class="btn-close"
          (click)="error.set(null)"
        ></button>
        <div class="mt-2">
          <button class="btn btn-outline-danger btn-sm" (click)="retryLoad()">
            🔄 Retry
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading()" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading archived articles...</p>
      </div>

      <!-- No Archived Articles -->
      <div
        *ngIf="!isLoading() && !error() && articles.length === 0"
        class="alert alert-info"
      >
        <h5>No archived articles found</h5>
        <p class="mb-0">Articles you archive will appear here.</p>
      </div>

      <!-- Archived Articles -->
      <div class="card archive-card mb-4" *ngFor="let article of articles">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h5 class="card-title">
                <a [routerLink]="['/news', article.id]" class="news-link">
                  {{ article.title }}
                </a>
              </h5>
              <p class="card-text">{{ article.summary }}</p>
              <p class="card-subtitle text-muted small">
                Published: {{ article.publishDate | date }}
              </p>
              <div class="mt-2">
                <span
                  *ngFor="let tag of article.tags"
                  class="badge bg-secondary me-1"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="ms-3 d-flex flex-column gap-2">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="showRestoreConfirmation(article)"
                title="Restore this article"
                [disabled]="isRestoring()"
              >
                <span
                  *ngIf="isRestoring()"
                  class="spinner-border spinner-border-sm me-1"
                ></span>
                📤 Restore
              </button>
              <button
                class="btn btn-outline-secondary btn-sm"
                [routerLink]="['/news', article.id]"
                title="View full article"
              >
                👁️ View
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Restore Confirmation Dialog -->
      <app-confirmation-dialog
        #restoreDialog
        modalId="restoreConfirmationModal"
        title="Restore Article"
        [message]="restoreMessage()"
        confirmButtonText="Restore"
        confirmButtonClass="btn-primary"
        [isLoading]="isRestoring()"
        (confirmed)="confirmRestore()"
        (cancelled)="cancelRestore()"
      ></app-confirmation-dialog>
    </section>
  `,
  styles: [
    `
      .archive {
        .section-title {
          color: var(--bs-primary);
          border-bottom: 2px solid var(--bs-warning);
          padding-bottom: 0.5rem;
        }

        .archive-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
          border-left: 5px solid var(--bs-warning);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          .news-link {
            text-decoration: none;
            color: inherit;
            transition: color 0.2s ease;

            &:hover {
              color: var(--bs-primary);
            }
          }

          .btn {
            transition: all 0.2s ease;

            &:hover {
              transform: scale(1.05);
            }
          }
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      // Stagger animation for multiple cards
      .archive-card:nth-child(1) {
        animation-delay: 0.1s;
      }
      .archive-card:nth-child(2) {
        animation-delay: 0.2s;
      }
      .archive-card:nth-child(3) {
        animation-delay: 0.3s;
      }
      .archive-card:nth-child(4) {
        animation-delay: 0.4s;
      }
      .archive-card:nth-child(5) {
        animation-delay: 0.5s;
      }
    `,
  ],
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
