import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
