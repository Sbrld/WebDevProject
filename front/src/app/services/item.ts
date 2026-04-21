import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items/';
  private mediaOrigin = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getItems(filters?: any): Observable<Item[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }
    return this.http
      .get<Item[]>(this.apiUrl, { params })
      .pipe(map((items) => items.map((item) => this.normalizeItem(item))));
  }

  getItem(id: number): Observable<Item> {
    return this.http
      .get<Item>(`${this.apiUrl}${id}/`)
      .pipe(map((item) => this.normalizeItem(item)));
  }

  createItem(item: FormData): Observable<Item> {
    return this.http
      .post<Item>(this.apiUrl, item)
      .pipe(map((createdItem) => this.normalizeItem(createdItem)));
  }

  updateItem(id: number, item: FormData): Observable<Item> {
    return this.http
      .put<Item>(`${this.apiUrl}${id}/`, item)
      .pipe(map((updatedItem) => this.normalizeItem(updatedItem)));
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getMyItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${this.apiUrl}my/`)
      .pipe(map((items) => items.map((item) => this.normalizeItem(item))));
  }

  private normalizeItem(item: Item): Item {
    if (!item.image) {
      return item;
    }

    if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
      return item;
    }

    return {
      ...item,
      image: `${this.mediaOrigin}${item.image}`,
    };
  }
}
