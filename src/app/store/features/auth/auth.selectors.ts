// File: store/features/auth/auth.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state'; // Overall app state interface (if used)
import { AuthState } from './auth.state';  // Auth feature state interface

/**
 * Select the auth feature state from the global store.
 * This assumes the 'auth' key was used in StoreModule.forRoot or forFeature.
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * Select the loading flag from the auth state.
 * Indicates if an auth-related async operation (login, profile fetch) is in progress.
 */
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

/**
 * Select the current error message from the auth state.
 * Will be null or string describing the latest auth error.
 */
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

/**
 * Select the boolean flag indicating if the user is authenticated.
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

/**
 * Select the full user profile object stored in the auth state.
 * This may be null or a User object after profile fetch success.
 */
export const selectUserProfile = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
