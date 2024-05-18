import { createAction, props } from '@ngrx/store';
import { IanimeCard, IanimeResponse } from '../../models/Models.interface'; 

export const loadAnime = createAction('[Anime] Load Anime');
export const loadAnimeSuccess = createAction('[Anime] Load Anime Success', props<{ recentAnime: IanimeResponse, favouriteAnime:IanimeResponse, popularAnime: IanimeResponse }>());
export const loadAnimeFailure = createAction('[Anime] Load Anime Failure', props<{ error: any }>());
