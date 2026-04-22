import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { parseBackendErrors } from '../../../core/utils/backend-errors.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  // ─── Reactive Form ──────────────────────────────────────────────────────
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // ─── Состояние UI ────────────────────────────────────────────────────────
  errorMsg = '';
  loading = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  // ─── Геттеры для удобного доступа к полям в шаблоне ─────────────────────
  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

  // ─── Отправка формы ──────────────────────────────────────────────────────
  onLogin(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.auth
      .login({
        username: this.username.value ?? '',
        password: this.password.value ?? '',
      })
      .subscribe({
        // FIX: было navigate(['/']) → бесконечный редирект т.к. маршрут 'home' не создан
        // Редиректим на /profile до тех пор, пока команда не добавит /home
        next: () => this.router.navigate(['/home']),
        error: (err) => {
          this.errorMsg = parseBackendErrors(err);
          this.loading = false;
        },
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
