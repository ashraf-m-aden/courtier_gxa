import { createAction, props } from '@ngrx/store';
import { TierDisplay } from '../../../Model/tierDisplay.model';

export const loadDossiers = createAction('[Courtier] Load Dossiers');
export const loadDossiersSuccess = createAction('[Courtier] Load Dossiers Success', props<{ Dossiers: any[] }>());
export const loadDossiersFailure = createAction('[Courtier] Load Dossiers Failure', props<{ error: any }>());


export const loadTiersData = createAction('[Courtier] Load Tiers Data');
export const loadTiersDataSuccess = createAction('[Courtier] Load Tiers Data Success', props<{ tiers: TierDisplay[] }>());
export const loadTiersDataFailure = createAction('[Courtier] Load Tiers Data Failure', props<{ error: any }>());
