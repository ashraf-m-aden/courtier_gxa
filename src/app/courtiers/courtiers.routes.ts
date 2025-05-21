import { Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAppStore } from '../store/app-store.module';
import { provideStore } from '@ngrx/store';
import { courtierReducer } from '../store/features/courtiers/courtier.reducer';
import { authReducer } from '../store/features/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { CourtierEffects } from '../store/features/courtiers/courtier.effects';
import { AuthEffects } from '../store/features/auth/auth.effects';
import { CourtiersLayoutComponent } from './courtiers-layout/courtiers-layout.component';

export const courtiersRoutes: Routes = [
    {
      path: '',
      component: CourtiersLayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full',
          providers:[provideAnimations(),
            provideStore([courtierReducer, authReducer ]),
            provideEffects(CourtierEffects,AuthEffects)
           ]
         },
       { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
       { path: 'produits', loadComponent: () => import('./produits/produits.component').then(m => m.ProduitsComponent) },
       { path: 'commissions', loadComponent: () => import('./commissions/commissions.component').then(m => m.CommissionsComponent) },
       { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) }
      ]
    },
    {
      path: 'tiers',
      loadChildren: () => import('./tier/tier.routes').then(m => m.tierRoutes)
    },
  ];
