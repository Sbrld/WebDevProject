import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items/';

  constructor(private http: HttpClient) {}

  getItems(filters?: any): Observable<Item[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }
    return this.http.get<Item[]>(this.apiUrl, { params });
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}${id}/`);
  }

  createItem(item: FormData): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: number, item: FormData): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}${id}/`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getMyItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}my/`);
  }
}
