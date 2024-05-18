import { createAction, props } from '@ngrx/store';
import {  ItvResponse } from '../../models/Models.interface'; 

export const loadTvShows = createAction('[TV Shows] Load TV Shows');
export const loadTvShowsSuccess = createAction('[TV Shows] Load TV Shows Success', props<{ trendingTvShows: ItvResponse, topRatedTvShows:ItvResponse, comedyTvShows:ItvResponse, nowPlayingTvShows:ItvResponse }>());
export const loadTvShowsFailure = createAction('[TV Shows] Load TV Shows Failure', props<{ error: any }>());
