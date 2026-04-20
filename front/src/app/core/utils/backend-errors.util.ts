import { HttpErrorResponse } from '@angular/common/http';

// ─── Утилита: парсит ошибки от Django backend в читаемый текст ───────────────
export function parseBackendErrors(err: HttpErrorResponse): string {
  const data = err.error;

  if (!data) return 'Произошла ошибка. Попробуйте снова.';

  // Одиночное сообщение: { "error": "Invalid credentials" }
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  if (data.error) return data.error;

  // Объект с полями: { "username": ["Already exists"], "email": [...] }
  if (typeof data === 'object') {
    const messages: string[] = [];
    for (const [field, errors] of Object.entries(data)) {
      const errList = Array.isArray(errors) ? errors : [errors];
      // Добавляем название поля для ясности
      const fieldName = fieldLabels[field] ?? field;
      messages.push(`${fieldName}: ${errList.join(', ')}`);
    }
    if (messages.length > 0) return messages.join('\n');
  }

  return 'Произошла ошибка. Попробуйте снова.';
}

// Человекочитаемые названия полей
const fieldLabels: Record<string, string> = {
  username: 'Имя пользователя',
  email: 'Email',
  password: 'Пароль',
  password2: 'Повтор пароля',
  non_field_errors: 'Ошибка',
};
