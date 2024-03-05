import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const isUserGuard: CanActivateFn = function () {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
