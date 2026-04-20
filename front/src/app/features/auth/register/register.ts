import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { parseBackendErrors } from '../../../core/utils/backend-errors.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  // ─── Reactive Form с кастомным валидатором совпадения паролей ───────────
  form = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password2: new FormControl<string>('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  errorMsg = '';
  loading = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  // ─── Геттеры полей ────────────────────────────────────────────────────────
  get username()  { return this.form.controls.username; }
  get email()     { return this.form.controls.email; }
  get password()  { return this.form.controls.password; }
  get password2() { return this.form.controls.password2; }

  // ─── FIX: явная проверка без optional chaining перед сравнением ───────────
  // Раньше было: this.password.value?.length > 0  → TS2532 (possibly undefined)
  // Теперь:      (this.password.value ?? '').length > 0  → всегда string
  get passwordsMatch(): boolean {
    const pw  = this.password.value  ?? '';
    const pw2 = this.password2.value ?? '';
    return pw.length > 0 && pw2.length > 0 && !this.form.hasError('passwordMismatch');
  }

  // ─── Отправка ─────────────────────────────────────────────────────────────
  onRegister(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    // form.controls — типизированный доступ, не нужен ненужный ! оператор
    this.auth
      .register({
        username:  this.username.value  ?? '',
        email:     this.email.value     ?? '',
        password:  this.password.value  ?? '',
        password2: this.password2.value ?? '',
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
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
