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
import { TierListComponent } from './tier/list/tier-list.component';
import { TierDetailComponent } from './tier/detail/tier-detail.component';

export const courtiersRoutes: Routes = [
  {
    path: '',
    component: CourtiersLayoutComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
        providers: [provideAnimations(),
        provideStore([courtierReducer, authReducer]),
        provideEffects(CourtierEffects, AuthEffects)
        ]
      },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'produits', loadComponent: () => import('./produits/produits.component').then(m => m.ProduitsComponent) },
      { path: 'projets', loadComponent: () => import('./projets/projets.component').then(m => m.ProjetsComponent) },
      { path: 'contrats', loadComponent: () => import('./contrats/contrats.component').then(m => m.ContratsComponent) },
      { path: 'commissions', loadComponent: () => import('./commissions/commissions.component').then(m => m.CommissionsComponent) },
      { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'tiers', loadComponent: () => import('./tier/list/tier-list.component').then(m => m.TierListComponent) },
      { path: 'tiers/:id', loadComponent: () => import('./tier/detail/tier-detail.component').then(m => m.TierDetailComponent) },

    ]
  },
];
