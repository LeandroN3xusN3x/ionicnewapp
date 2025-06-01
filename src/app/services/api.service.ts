// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://newsapi.org/v2';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getTopHeadlines(country: string = 'br'): Observable<Article[]> {
    return this.http.get<NewsApiResponse>(`${this.apiUrl}/top-headlines?country=${country}&apiKey=${this.apiKey}`)
      .pipe(
        map(response => response.articles)
      );
  }

  getNewsByCategory(category: string, country: string = 'br'): Observable<Article[]> {
    return this.http.get<NewsApiResponse>(`${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`)
      .pipe(
        map(response => response.articles)
      );
  }
}
