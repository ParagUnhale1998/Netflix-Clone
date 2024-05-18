import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimeState } from '../state/anime.state';

const getAnimeState = createFeatureSelector<AnimeState>('anime');

export const getRecentAnime = createSelector(getAnimeState, state => state.recentAnime);
export const getFavouriteAnime = createSelector(getAnimeState, state => state.favouriteAnime);
export const getPopularAnime = createSelector(getAnimeState, state => state.popularAnime);
