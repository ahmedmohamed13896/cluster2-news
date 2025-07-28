export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  publishDate: Date;
  archived: boolean;
}
