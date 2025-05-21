import { BasSecurityContext } from "../../../Model/BasSoapObject/BasSecurityContext";
import { User } from "../../../Model/user.model";

/**
 * Interface representing the shape of the authentication state slice.
 */
export interface AuthState {
  user: User;                     // Stores the detailed user profile (e.g. from getProfileSuccess)
  BasSec: BasSecurityContext | null; // Stores security context info from login (nullable)
  isAuthenticated: boolean;       // Flag indicating if the user is authenticated
  loading: boolean;               // Flag indicating if an auth-related operation is in progress
  error: any;                    // Stores any error messages or objects (can be string or object)
}

/**
 * Initial/default state for the auth feature slice.
 */
export const initialAuthState: AuthState = {
  user: {
    login: ""  // Initialize user with empty login (you can add other default props if needed)
  },
  BasSec: null,         // No security context at start (not logged in)
  isAuthenticated: false, // User starts unauthenticated
  loading: false,        // No operation in progress initially
  error: null            // No error initially
};
