import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from '../state/movies.state';

const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getPopularMovies = createSelector(getMoviesState, state => state.popularMovies);
export const getTopRatedMovies = createSelector(getMoviesState, state => state.topRatedMovies);
export const getUpcomingMovies = createSelector(getMoviesState, state => state.upcomingMovies);
export const getNowPlayingMovies = createSelector(getMoviesState, state => state.nowPlayingMovies);
