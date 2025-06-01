// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService, Article } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  articles: Article[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTopHeadlines();
  }

  loadTopHeadlines(event?: any) {
    this.apiService.getTopHeadlines().subscribe(
      (data) => {
        this.articles = data;
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Erro ao buscar notícias:', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }
}