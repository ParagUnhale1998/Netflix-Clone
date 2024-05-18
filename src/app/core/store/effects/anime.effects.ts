import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadAnime, loadAnimeSuccess, loadAnimeFailure } from '../actions/anime.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable()
export class AnimeEffects {
  loadAnime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAnime),
      mergeMap(() => this.animeApiService.getAnimeData().pipe(
        map(data => loadAnimeSuccess(data)),
        catchError(error => of(loadAnimeFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private animeApiService: ApiService
  ) {}
}
