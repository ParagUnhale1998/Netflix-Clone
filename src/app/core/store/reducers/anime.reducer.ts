import { Action, createReducer, on } from '@ngrx/store';
import { loadAnime, loadAnimeSuccess, loadAnimeFailure } from '../actions/anime.actions';
import { initialAnimeState, AnimeState } from '../state/anime.state';

const _animeReducer = createReducer(
  initialAnimeState,
  on(loadAnime, state => ({ ...state })),
  on(loadAnimeSuccess, (state, { recentAnime, favouriteAnime, popularAnime }) => ({
    ...state,
    recentAnime,
    favouriteAnime,
    popularAnime,
  })),
  on(loadAnimeFailure, (state, { error }) => ({ ...state, error }))
);

export function animeReducer(state: AnimeState | undefined, action: Action) {
  return _animeReducer(state, action);
}
