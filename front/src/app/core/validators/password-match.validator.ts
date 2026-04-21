import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// ─── Кастомный валидатор: проверяет совпадение паролей ───────────────────────
export const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const password2 = group.get('password2')?.value;

  if (!password || !password2) return null;

  return password === password2 ? null : { passwordMismatch: true };
};
