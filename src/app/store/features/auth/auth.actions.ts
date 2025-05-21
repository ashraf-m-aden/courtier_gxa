// NgRx utilities for creating actions and typing payloads
import { createAction, props } from '@ngrx/store';

// Custom types from your application
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { User } from '../../../Model/user.model';

// --------------------------------------
// Auth Actions for Login Flow
// --------------------------------------

/**
 * Dispatched to start the login process.
 * Often used to show a loading spinner or trigger an effect.
 */
export const loginStart = createAction(
  '[Auth] Login Start'
);

/**
 * Dispatched with login credentials (username, password, domain).
 * Triggers the effect that sends login request to the backend.
 */
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string; domain: string }>()
);

/**
 * Dispatched when the login is successful.
 * Carries the authenticated user context and credentials info.
 */
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: BasSecurityContext; username: string; domain: string }>()
);

/**
 * Dispatched when login fails.
 * Carries the error object for debugging or UI display.
 */
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>() // Optional: replace `any` with a typed error model
);

// --------------------------------------
// Profile Fetching Actions
// --------------------------------------

/**
 * Triggers fetching the full user profile (after successful login).
 * Typically used to get user roles, permissions, etc.
 */
export const getProfile = createAction(
  '[Auth] Get Prof',
  props<{ username: string; domain: string }>()
);

/**
 * Dispatched when user profile is successfully retrieved.
 */
export const getProfileSuccess = createAction(
  '[Auth] Get Prof Success',
  props<{ user: User }>()
);

/**
 * Dispatched when profile retrieval fails.
 */
export const getProfileFailure = createAction(
  '[Auth] Get Prof Failure',
  props<{ error: any }>()
);

// --------------------------------------
// Logout Action
// --------------------------------------

/**
 * Clears the auth state, logs the user out.
 * Can also trigger effect to clear tokens, redirect, etc.
 */
export const logout = createAction(
  '[Auth] Logout'
);
