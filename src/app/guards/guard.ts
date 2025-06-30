// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';

// 🔐 Helper function to check if token is valid (not expired)
function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    return Date.now() / 1000 < exp; // Check current time < expiration
  } catch (err) {
    return false; // Malformed token or decoding issue
  }
}

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && isTokenValid(token)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
