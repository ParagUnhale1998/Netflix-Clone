import { Action, createReducer, on } from '@ngrx/store';
import { loadTvShows, loadTvShowsSuccess, loadTvShowsFailure } from '../actions/tvshows.actions';
import { initialTvShowsState, TvShowsState } from '../state/tvshows.state';

const _tvShowsReducer = createReducer(
  initialTvShowsState,
  on(loadTvShows, state => ({ ...state })),
  on(loadTvShowsSuccess, (state, { trendingTvShows, topRatedTvShows, comedyTvShows, nowPlayingTvShows }) => ({
    ...state,
    trendingTvShows,
    topRatedTvShows,
    comedyTvShows,
    nowPlayingTvShows,
  })),
  on(loadTvShowsFailure, (state, { error }) => ({ ...state, error }))
);

export function tvShowsReducer(state: TvShowsState | undefined, action: Action) {
  return _tvShowsReducer(state, action);
}
