import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from '../actions/movies.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() => this.moviesApiService.getMoviesData().pipe(
        map((data) => loadMoviesSuccess(data)),
        catchError(error => of(loadMoviesFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private moviesApiService: ApiService
  ) {}
}
