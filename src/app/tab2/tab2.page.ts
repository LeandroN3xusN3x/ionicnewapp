// src/app/tab2/tab2.page.ts
import { Component } from '@angular/core';
import { ApiService, Article } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  categories: string[] = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string = this.categories[0];
  articles: Article[] = [];
  loading = false;

  constructor(private apiService: ApiService) {
    this.loadNews();
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.apiService.getNewsByCategory(this.selectedCategory).subscribe(
      (data) => {
        this.articles = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao buscar notícias por categoria:', error);
        this.loading = false;
      }
    );
  }
}