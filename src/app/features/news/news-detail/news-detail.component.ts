import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsStateService } from '../../../state/news-state.service';
import { NewsArticle } from '../../../models/news-article.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./news-detail.component.scss'],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private state = inject(NewsStateService);

  article?: NewsArticle;

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article = await this.state.getNewsById(id);
  }
}
