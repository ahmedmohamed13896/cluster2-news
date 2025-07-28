import { Injectable } from '@angular/core';
import { NewsArticle } from '../models/news-article.model';

@Injectable({ providedIn: 'root' })
export class NewsDataService {
  private news: NewsArticle[] = [
    {
      id: 1,
      title: 'New Terminal Opens at Cluster2 Airport',
      summary: 'A new terminal was inaugurated with advanced facilities.',
      content: 'The Cluster2 Airport inaugurated a new terminal today, featuring smart check-in counters, biometric security, and more international lounges.',
      tags: ['terminal', 'opening'],
      publishDate: new Date('2025-07-20'),
      archived: false
    },
    {
      id: 2,
      title: 'Record-Breaking Passenger Numbers in June',
      summary: 'Cluster2 Airport served a record number of travelers.',
      content: 'Passenger traffic hit an all-time high in June, surpassing 3 million travelers, thanks to summer holidays and new flight routes.',
      tags: ['passengers', 'record'],
      publishDate: new Date('2025-07-10'),
      archived: false
    },
    {
      id: 3,
      title: 'Sustainability Drive at Cluster2 Airport',
      summary: 'Solar panels and eco-initiatives reduce carbon footprint.',
      content: 'Cluster2 Airport launches its Green Gate Initiative, installing solar panels and launching electric shuttles to promote sustainability.',
      tags: ['sustainability', 'green', 'environment'],
      publishDate: new Date('2025-06-22'),
      archived: false
    },
    {
      id: 4,
      title: 'Cluster2 Airport Launches App for Travelers',
      summary: 'A new mobile app improves passenger experience.',
      content: 'The new Cluster2 app provides real-time flight updates, navigation inside the terminal, and contactless boarding passes.',
      tags: ['technology', 'app'],
      publishDate: new Date('2025-06-15'),
      archived: false
    },
    {
      id: 5,
      title: 'Art Installation Unveiled in Terminal B',
      summary: 'New artwork celebrates local culture.',
      content: 'A stunning sculpture titled "Wings of Tomorrow" has been unveiled in Terminal B, featuring contributions from local artists.',
      tags: ['art', 'terminal B'],
      publishDate: new Date('2025-06-05'),
      archived: false
    },
    {
      id: 6,
      title: 'Temporary Runway Closure Scheduled',
      summary: 'Runway 2C will be closed for maintenance next week.',
      content: 'Cluster2 Airport will conduct maintenance on Runway 2C from July 30 to August 2, impacting several domestic flights.',
      tags: ['maintenance', 'runway'],
      publishDate: new Date('2025-07-25'),
      archived: false
    },
    {
      id: 7,
      title: 'VIP Lounge Access Upgraded',
      summary: 'Frequent flyers to enjoy more perks.',
      content: 'Cluster2 Airport has enhanced its VIP lounge services with gourmet catering, faster Wi-Fi, and private workspaces.',
      tags: ['lounge', 'VIP'],
      publishDate: new Date('2025-07-15'),
      archived: false
    },
    {
      id: 8,
      title: 'Cluster2 Airport Hosts Aviation Careers Fair',
      summary: 'Students and professionals attended the career expo.',
      content: 'The airport hosted over 50 aviation companies during its career fair aimed at recruiting talent in engineering, hospitality, and logistics.',
      tags: ['careers', 'expo', 'education'],
      publishDate: new Date('2025-07-18'),
      archived: false
    }
  ];

  async getAll(): Promise<NewsArticle[]> {
    try {
      return Promise.resolve([...this.news]);
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw new Error('Failed to fetch news articles');
    }
  }

  async add(article: NewsArticle): Promise<void> {
    try {
      const id = this.news.length > 0 ? Math.max(...this.news.map(a => a.id)) + 1 : 1;
      this.news.push({ ...article, id, archived: false });
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding news article:', error);
      throw new Error('Failed to add news article');
    }
  }

  async archive(id: number): Promise<void> {
    try {
      const index = this.news.findIndex(a => a.id === id);
      if (index !== -1) {
        this.news[index].archived = true;
        return Promise.resolve();
      } else {
        throw new Error('Article not found');
      }
    } catch (error) {
      console.error('Error archiving news article:', error);
      throw new Error('Failed to archive news article');
    }
  }

  async unarchive(id: number): Promise<void> {
    try {
      const index = this.news.findIndex(a => a.id === id);
      if (index !== -1) {
        this.news[index].archived = false;
        return Promise.resolve();
      } else {
        throw new Error('Article not found');
      }
    } catch (error) {
      console.error('Error unarchiving news article:', error);
      throw new Error('Failed to unarchive news article');
    }
  }

  async getById(id: number): Promise<NewsArticle | undefined> {
    try {
      const article = this.news.find(n => n.id === id);
      if (!article) {
        throw new Error('Article not found');
      }
      return Promise.resolve(article);
    } catch (error) {
      console.error('Error fetching news article by ID:', error);
      throw new Error('Failed to fetch news article');
    }
  }

  async getArchived(): Promise<NewsArticle[]> {
    try {
      return Promise.resolve(this.news.filter(n => n.archived));
    } catch (error) {
      console.error('Error fetching archived news:', error);
      throw new Error('Failed to fetch archived news articles');
    }
  }
}
