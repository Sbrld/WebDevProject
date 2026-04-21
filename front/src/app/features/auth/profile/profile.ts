import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { parseBackendErrors } from '../../../core/utils/backend-errors.util';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  // ─── Reactive Form для редактирования профиля ────────────────────────────
  form = new FormGroup({
    bio:   new FormControl(''),
    phone: new FormControl('', [
      Validators.pattern(/^[\+]?[\d\s\-\(\)]{7,15}$/), // базовый формат телефона
    ]),
  });

  user: User | null = null;
  successMsg = '';
  errorMsg = '';
  loading = false;
  loadError = false;
  editMode = false;

  constructor(private auth: AuthService, private router: Router) {}

  get bio()   { return this.form.get('bio')!; }
  get phone() { return this.form.get('phone')!; }

  ngOnInit(): void {
    this.auth.getProfile().subscribe({
      next: (u) => {
        this.user = u;
        // Заполняем форму данными с сервера
        this.form.patchValue({ bio: u.bio ?? '', phone: u.phone ?? '' });
      },
      error: () => { this.loadError = true; },
    });
  }

  // ─── Сохранение профиля ───────────────────────────────────────────────────
  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const { bio, phone } = this.form.value;
    this.auth.updateProfile({ bio: bio ?? '', phone: phone ?? '' }).subscribe({
      next: (u) => {
        this.user = u;
        this.successMsg = 'Профиль обновлён!';
        this.editMode = false;
        this.loading = false;
        // Убираем сообщение через 3 секунды
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.errorMsg = parseBackendErrors(err);
        this.loading = false;
      },
    });
  }

  // ─── Выход из аккаунта ────────────────────────────────────────────────────
  onLogout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        // Даже при ошибке сервера — чистим локальные данные и уходим
        localStorage.clear();
        this.router.navigate(['/login']);
      },
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.successMsg = '';
    this.errorMsg = '';
    // При отмене — сбрасываем форму к текущим данным пользователя
    if (!this.editMode && this.user) {
      this.form.patchValue({ bio: this.user.bio ?? '', phone: this.user.phone ?? '' });
    }
  }

  getInitial(): string {
    return this.user?.username?.charAt(0).toUpperCase() ?? '?';
  }
}
