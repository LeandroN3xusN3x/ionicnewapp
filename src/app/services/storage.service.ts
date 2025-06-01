// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; 
import { Article } from './api.service';

const FAVORITES_KEY = 'my-favorites';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getFavorites(): Promise<Article[]> {
    const { value } = await Preferences.get({ key: FAVORITES_KEY }); 
    return value ? JSON.parse(value) : [];
  }

  async isFavorite(article: Article): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some(fav => fav.url === article.url);
  }

  async addToFavorites(article: Article) {
    const favorites = await this.getFavorites();
    if (!await this.isFavorite(article)) {
      favorites.push(article);
      await Preferences.set({ // 
        key: FAVORITES_KEY,
        value: JSON.stringify(favorites)
      });
    }
  }

  async removeFromFavorites(article: Article) {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.url !== article.url);
    await Preferences.set({ 
      key: FAVORITES_KEY,
      value: JSON.stringify(updatedFavorites)
    });
  }
}