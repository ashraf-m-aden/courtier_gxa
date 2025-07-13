import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

/**
 * Reducer function to handle authentication-related state updates.
 * Uses NgRx `createReducer` utility with action handlers defined by `on`.
 */
export const authReducer = createReducer(
  initialAuthState,  // Initial state of the auth feature

  // When login process starts (loginStart action),
  // set loading to true and clear isAuthenticated flag.
  on(AuthActions.loginStart, (state) => ({
    ...state,
    loading: true,
    isAuthenticated: false
  })),

  // When login action is dispatched (e.g., user submits credentials),
  // also set loading to true and clear isAuthenticated flag.
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    isAuthenticated: false
  })),

  // When login succeeds:
  // - Store the returned BasSecurityContext user info in state under BasSec
  // - Set isAuthenticated to true
  // - Set loading to false to indicate completion
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    BasSec: user,
    isAuthenticated: true,
    loading: false,
  })),

  // When fetching the full user profile starts (getProfileile action),
  // just set loading to false (could also be true depending on your UX choice)
  on(AuthActions.getProfile, (state) => ({
    ...state,
    loading: false
  })),

  // When user profile is successfully fetched:
  // - Store the full User object under `user`
  // - Set loading to false to indicate completion
  on(AuthActions.getProfileSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
  })),

  // When login fails:
  // - Set loading to false
  // - Store error message (either string or fallback default)
  // - Clear isAuthenticated flag
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error:
      typeof error === 'string'
        ? error
        : (error as { message?: string })?.message || 'Erreur de connection, réessayer',
    isAuthenticated: false
  })),

// When user logs out:
// - Set loading to false (in case logout was triggered during a loading state)
// - Reset isAuthenticated to false to reflect the logout state
on(AuthActions.logout, (state) => ({
  ...state,
  loading: false,
  isAuthenticated: false
})),


  // When fetching profile fails:
  // - Set loading to false
  // - Store error message (either string or fallback default)
  // - Clear isAuthenticated flag to avoid inconsistent state
  on(AuthActions.getProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error:
      typeof error === 'string'
        ? error
        : error?.message || 'Erreur inconnue de chargement du profil utilisateur, reesayez',
    isAuthenticated: false
  }))
);
