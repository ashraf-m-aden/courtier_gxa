import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourtierState } from './courtier.state';

// 1. Select the top-level state slice
export const selectCourtierState = createFeatureSelector<CourtierState>('courtier');

// 2. Individual selectors

export const selectDossiers = createSelector(
  selectCourtierState,
  (state) => state.dossiers
);

export const selectContrats = createSelector(
  selectCourtierState,
  (state) => state.contrats
);

export const selectProduits = createSelector(
  selectCourtierState,
  (state) => state.produits
);

export const selectCommissions = createSelector(
  selectCourtierState,
  (state) => state.commissions
);

export const selectTiers = createSelector(
  selectCourtierState,
  (state) => state.tiers
);

export const selectLoading = createSelector(
  selectCourtierState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCourtierState,
  (state) => state.error
);
