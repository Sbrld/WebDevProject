// Защищает маршруты — позволяет зайти только авторизованным пользователям

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;                    // разрешить доступ
  }

  router.navigate(['/login']);      // если не залогинен — отправляем на страницу логина
  return false;
};
