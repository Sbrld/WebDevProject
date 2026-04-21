import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://127.0.0.1:8000/api';

  // ─── Реактивное состояние через Signals────────────────────
  private _currentUser = signal<User | null>(this._loadUser());
  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('access_token'));

  // Публичные readonly сигналы для использования в компонентах
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  // Вычисляемое значение: инициал имени пользователя для аватара
  readonly userInitial = computed(() =>
    this._currentUser()?.username?.charAt(0).toUpperCase() ?? '?'
  );

  constructor(private http: HttpClient) {}

  // ─── Регистрация ──────────────────────────────────────────────────────────
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API}/register/`, payload)
      .pipe(tap((res) => this._handleAuthSuccess(res)));
  }

  // ─── Вход ─────────────────────────────────────────────────────────────────
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API}/login/`, payload)
      .pipe(tap((res) => this._handleAuthSuccess(res)));
  }

  // ─── Выход ────────────────────────────────────────────────────────────────
  logout(): Observable<unknown> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http
      .post(`${this.API}/logout/`, { refresh })
      .pipe(tap(() => this._clearAuth()));
  }

  // ─── Профиль ─────────────────────────────────────────────────────────────
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API}/profile/`);
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.API}/profile/`, data)
      .pipe(tap((user) => this._currentUser.set(user)));
  }

  // ─── Приватные методы ─────────────────────────────────────────────────────
  private _handleAuthSuccess(res: AuthResponse): void {
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    localStorage.setItem('user', JSON.stringify(res.user));
    this._currentUser.set(res.user);
    this._isLoggedIn.set(true);
  }

  private _clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._isLoggedIn.set(false);
  }

  private _loadUser(): User | null {
    try {
      const raw = localStorage.getItem('user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
