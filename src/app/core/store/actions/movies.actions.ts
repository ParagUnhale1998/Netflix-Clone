import { createAction, props } from '@ngrx/store';
import { ImoviesCard, ImoviesResponse } from '../../models/Models.interface'; 

export const loadMovies = createAction('[Movies] Load Movies');
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ popularMovies: ImoviesResponse, topRatedMovies: ImoviesResponse, upcomingMovies: ImoviesResponse, nowPlayingMovies: ImoviesResponse }>());
export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ error: any }>());
