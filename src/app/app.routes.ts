import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/news/news-dashboard/news-dashboard.component').then(
        (m) => m.NewsDashboardComponent
      ),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./features/news/news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./features/news/news-form/news-form.component').then(
        (m) => m.NewsFormComponent
      ),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./features/archive/archive.component').then(
        (m) => m.ArchiveComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
