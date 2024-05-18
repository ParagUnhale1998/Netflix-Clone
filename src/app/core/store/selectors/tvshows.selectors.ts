import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TvShowsState } from '../state/tvshows.state';

const getTvShowsState = createFeatureSelector<TvShowsState>('tvshows');

export const getTrendingTvShows = createSelector(getTvShowsState, state => state.trendingTvShows);
export const getTopRatedTvShows = createSelector(getTvShowsState, state => state.topRatedTvShows);
export const getComedyTvShows = createSelector(getTvShowsState, state => state.comedyTvShows);
export const getNowPlayingTvShows = createSelector(getTvShowsState, state => state.nowPlayingTV);
