import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401  ) {
        authService.logout();
        router.navigate(['/login']);
      }
       if ( err.status === 500 ) {
        // authService.logout();
        // router.navigate(['/login']);
      }
      throw err;
    })
  );
};
