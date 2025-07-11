import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CourtierActions from './courtier.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { CourtierService } from '../../../Services/courtier/courtier.service';

@Injectable()
export class CourtierEffects {
  constructor(private actions$: Actions, private courtierService: CourtierService) {}

  loadDossiers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtierActions.loadDossiers),
      mergeMap(() =>
        this.courtierService.getDossiers().pipe(
          map(Dossiers => CourtierActions.loadDossiersSuccess({ Dossiers })),
          catchError(error => of(CourtierActions.loadDossiersFailure({ error })))
        )
      )
    )
  )
loadTiersData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CourtierActions.loadTiersData),
    switchMap(() =>
      this.courtierService.getTiers().pipe(
        map(tiers => CourtierActions.loadTiersDataSuccess({ tiers })),
        catchError(error => of(CourtierActions.loadTiersDataFailure({ error })))
      )
    )
  )
);

}
