import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NewsStateService } from '../../../state/news-state.service';
import { ThemeService } from '../../../core/theme.service';
import { NotificationService } from '../../../core/notification.service';

@Component({
  standalone: true,
  selector: 'app-news-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./news-form.component.scss'],
  templateUrl: './news-form.component.html',
})
export class NewsFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private state = inject(NewsStateService);
  private themeService = inject(ThemeService);
  private notificationService = inject(NotificationService);

  form!: FormGroup;
  isDarkMode = this.themeService.isDarkMode;
  isSubmitting = signal(false);

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      summary: [''],
      content: ['', [Validators.required]],
      tags: [''],
      publishDate: ['', [Validators.required]],
    });
  }

  async submit() {
    if (this.form.valid) {
      try {
        this.isSubmitting.set(true);
        const formValue = this.form.value;
        const tags = formValue.tags
          ? formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
          : [];

        await this.state.addNews({
          title: formValue.title,
          summary: formValue.summary,
          content: formValue.content,
          tags,
          publishDate: new Date(formValue.publishDate),
        });

        // Show success notification
        this.notificationService.showSuccess(
          `Article "${formValue.title}" has been created successfully.`,
          'Article Created'
        );

        this.router.navigate(['/']);
      } catch (error) {
        console.error('Failed to add news:', error);
        this.notificationService.showError(
          'Failed to create article. Please try again.',
          'Creation Failed'
        );
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}
