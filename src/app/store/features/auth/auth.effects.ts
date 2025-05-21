import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  // Using Angular 14+ inject() instead of constructor injection for these services
  private router = inject(Router);
  private actions$ = inject(Actions);           // Stream of dispatched actions from NgRx
  private authService = inject(AuthService);   // Your custom Auth API service

  constructor(
    private snackBar: MatSnackBar                // Angular Material Snackbar for notifications
  ) { }

  /**
   * Effect listening for 'login' action.
   * Calls authService.login() with username, password, and domain.
   * On success dispatches loginSuccess with user data.
   * On error dispatches loginFailure with error message.
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login), // Listen for login action
      tap(() => {
                    console.log("FROM EFFECT After .... this.authService.login");
        }),
      switchMap(({ username, password, domain }) =>
        this.authService.login(username, password, domain).pipe(
          map((user: BasSecurityContext) => {
            console.log("FROM EFFECT After .... this.authService.login");
            return AuthActions.loginSuccess({ user, username, domain });
          }),
          catchError((error: Error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * After successful login, automatically dispatch getProfile to fetch full user profile.
   */
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(({ user, username, domain }) =>
        AuthActions.getProfile({ username, domain })
      )
    )
  );

  /**
   * Effect to fetch user profile after receiving getProfile action.
   * Calls authService.getUserProfile().
   * On success dispatches getProfileSuccess with user profile.
   * On failure dispatches getProfileFailure with error message.
   */
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getProfile),
      switchMap(({ username, domain }) =>
        this.authService.getUserProfile(username, domain).pipe(
          map((user: User) => {
            console.log("FROM EFFECT After .... this.authService.login " + JSON.stringify(user));
            return AuthActions.getProfileSuccess({ user });
          }),
          catchError((error: Error) =>
            of(AuthActions.getProfileFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Effect to show snackbar notification on login failure.
   * No action dispatched after this effect (dispatch: false).
   */
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          console.error('Login error:', error);
          this.snackBar.open(this.humanizeError(error), 'Fermer', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Effect to navigate user to 'courtiers' page after successful profile retrieval.
   * No action dispatched after this effect.
   */
  getProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getProfileSuccess),
        // tap(() => this.router.navigate(['courtiers']))
      ),
    { dispatch: false }
  );

  /**
   * Effect to show snackbar notification on profile fetch failure.
   * No action dispatched after this effect.
   */
  getProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getProfileFailure),
        tap(({ error }) => {
          console.error('Erreur de Chargement du profil utilisateur:', error);
          this.snackBar.open(this.humanizeError(error), 'Fermer', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Effect to handle logout action.
   * Navigates user to /login and shows a snackbar confirming logout.
   * No action dispatched after this effect.
   */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
                    console.log("FROM EFFECT After .... this.authService.logout");
        }),
        map(() => {

          this.router.navigate(['/login']);
          this.snackBar.open('Déconnexion réussie.', 'Fermer', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Utility to parse/format error objects for user-friendly messages.
   */
  private formatError(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.error?.faultstring) return error.error.faultstring;
    if (error?.message) return error.message;
    return 'Erreur inconnue lors de l\'authentification.';
  }

  /**
   * Currently just returns error string as is.
   * You can customize to translate or prettify error messages here.
   */
  private humanizeError(error: string): string {
    return error;
  }
}
