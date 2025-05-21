import { provideRouter, Routes, withDebugTracing, withRouterConfig } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { LoginComponent } from './auth/login.component';
import { AuthEffects } from './store/features/auth/auth.effects';
import { authReducer } from './store/features/auth/auth.reducer';

// app.routes.ts
export const appRoutes: Routes = [
  {
    path: 'login',

    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'courtiers',
    loadChildren: () => import('./courtiers/courtiers.routes').then(m => m.courtiersRoutes),
  },
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  }
];
function provideState(arg0: string, authReducer: any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideEffects(AuthEffects: any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

