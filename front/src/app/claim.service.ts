import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Claim {
  id?: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: string;
  reported_by?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ClaimService {
  private apiUrl = 'http://localhost:8000/api/claims/';

  constructor(private http: HttpClient) {}

  createClaim(claim: Omit<Claim, 'id' | 'reported_by' | 'created_at' | 'updated_at'>): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }
}
