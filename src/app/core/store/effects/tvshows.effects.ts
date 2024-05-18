import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTvShows, loadTvShowsSuccess, loadTvShowsFailure } from '../actions/tvshows.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable()
export class TvShowsEffects {
  loadTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTvShows),
      mergeMap(() => this.tvShowsApiService.getTvShowsData().pipe(
        map(data => loadTvShowsSuccess(data)),
        catchError(error => of(loadTvShowsFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private tvShowsApiService: ApiService
  ) {}
}
