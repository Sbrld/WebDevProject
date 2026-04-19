// Компонент регистрации нового пользователя

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { parseBackendErrors } from '../../../core/utils/backend-errors.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Реактивная форма регистрации
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator });

  errorMsg = '';
  loading = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get username()  { return this.form.get('username')!; }
  get email()     { return this.form.get('email')!; }
  get password()  { return this.form.get('password')!; }
  get password2() { return this.form.get('password2')!; }

  onRegister(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const payload = this.form.value as any;

    this.auth.register(payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMsg = parseBackendErrors(err);
        this.loading = false;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
