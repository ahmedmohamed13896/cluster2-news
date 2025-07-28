import { computed, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { NewsDataService } from '../core/news-data.service';

@Injectable({ providedIn: 'root' })
export class NewsStateService {
  private readonly _newsList = signal<NewsArticle[]>([]);
  readonly newsList = this._newsList.asReadonly();

  constructor(private data: NewsDataService) {}

  async loadNews(): Promise<void> {
    const news = await this.data.getAll();
    this._newsList.set(news.filter((n) => !n.archived));
  }

  async addNews(article: Omit<NewsArticle, 'id' | 'archived'>): Promise<void> {
    const completeArticle: NewsArticle = {
      ...article,
      id: 0, // placeholder, actual ID assigned in data service
      archived: false,
    };
    await this.data.add(completeArticle);
    await this.loadNews();
  }

  async archiveNews(id: number): Promise<void> {
    await this.data.archive(id);
    await this.loadNews();
  }

  async unarchiveNews(id: number): Promise<void> {
    await this.data.unarchive(id);
    await this.loadNews();
  }

  getNewsById(id: number): Promise<NewsArticle | undefined> {
    return this.data.getById(id);
  }

  async loadArchived(): Promise<NewsArticle[]> {
    return this.data.getArchived();
  }

  getFilteredNewsSignal = (querySignal: Signal<string>) =>
    computed(() => {
      const current = this._newsList();
      const lowerQuery = querySignal().toLowerCase();
      return current.filter(
        (n) =>
          n.title.toLowerCase().includes(lowerQuery) ||
          n.content.toLowerCase().includes(lowerQuery) ||
          n.summary.toLowerCase().includes(lowerQuery) ||
          n.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    });
}
