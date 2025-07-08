import { ListBordereauxComponent } from './bordereaux/list/list.component';
import { NouveauContratComponent } from './contrats/nouveau-contrat/nouveau-contrat.component';
import { ListContratComponent } from './contrats/list/list.component';
import { TierNouveauComponent } from './tier/tier-nouveau/tier-nouveau.component';
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
      {
        path: 'projets/nouveau', loadComponent: () => import('./contrats/nouveau-contrat/nouveau-contrat.component').then(m => m.NouveauContratComponent), data: { isContrat: false }
      },
      { path: 'projets', loadComponent: () => import('./projets/projets.component').then(m => m.ProjetsComponent) },
      { path: 'contrats', loadComponent: () => import('./contrats/list/list.component').then(m => m.ListContratComponent) },
      { path: 'contrats/nouveau', loadComponent: () => import('./contrats/nouveau-contrat/nouveau-contrat.component').then(m => m.NouveauContratComponent), data: { isContrat: true } },
      { path: 'contrats/details/:id', loadComponent: () => import('./contrats/nouveau-contrat/nouveau-contrat.component').then(m => m.NouveauContratComponent), data: { isContrat: true, isEdit: true } },
      { path: 'projets/details/:id', loadComponent: () => import('./contrats/nouveau-contrat/nouveau-contrat.component').then(m => m.NouveauContratComponent), data: { isContrat: false, isEdit: true } },
      { path: 'commissions', loadComponent: () => import('./commissions/commissions.component').then(m => m.CommissionsComponent) },
      { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'tiers', loadComponent: () => import('./tier/list/tier-list.component').then(m => m.TierListComponent) },
      { path: 'tiers/details/:id', loadComponent: () => import('./tier/detail/tier-detail.component').then(m => m.TierDetailComponent) },
      { path: 'tiers/nouveau', loadComponent: () => import('./tier/tier-nouveau/tier-nouveau.component').then(m => m.TierNouveauComponent) },
      { path: 'bordereaux/list', loadComponent: () => import('./bordereaux/list/list.component').then(m => m.ListBordereauxComponent) },
      { path: 'encaissement/list', loadComponent: () => import('./encaissement/list/list.component').then(m => m.ListEncaissementComponent) },
      { path: 'bordereaux/nouveau', loadComponent: () => import('./bordereaux/nouveau/nouveau.component').then(m => m.NouveauBordereauComponent) },
      { path: 'bordereaux/quittance/list', loadComponent: () => import('./quittance/list/list.component').then(m => m.ListQuittanceComponent) },
      { path: 'quittance/nouveau', loadComponent: () => import('./quittance/nouveau/nouveau.component').then(m => m.NouveauQuittanceComponent) },

    ]
  },
];
