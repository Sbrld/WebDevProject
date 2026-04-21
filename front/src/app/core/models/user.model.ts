// ─── Модели данных для пользователя и аутентификации ───────────────────────

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  created_at: string;
}

// Ответ от сервера при логине / регистрации
export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

// Типизированные ошибки от Django backend
export interface BackendErrors {
  [field: string]: string[];
}
