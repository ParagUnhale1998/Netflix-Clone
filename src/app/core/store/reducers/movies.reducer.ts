import { Action, createReducer, on } from '@ngrx/store';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from '../actions/movies.actions';
import { initialMoviesState, MoviesState } from '../state/movies.state';

const _moviesReducer = createReducer(
  initialMoviesState,
  on(loadMovies, state => ({ ...state })),
  on(loadMoviesSuccess, (state, { popularMovies, topRatedMovies, upcomingMovies, nowPlayingMovies }) => ({
    ...state,
    popularMovies,
topRatedMovies,
upcomingMovies,
nowPlayingMovies

  })),
  on(loadMoviesFailure, (state, { error }) => ({ ...state, error }))
);

export function moviesReducer(state: MoviesState | undefined, action: Action) {
  return _moviesReducer(state, action);
}
