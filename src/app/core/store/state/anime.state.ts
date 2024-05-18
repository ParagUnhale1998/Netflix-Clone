import { IanimeCard, IanimeResponse } from "../../models/Models.interface"; 

export interface AnimeState {
  recentAnime: IanimeResponse | null;
  favouriteAnime: IanimeResponse | null;
  popularAnime: IanimeResponse | null;
  error: any;
}

export const initialAnimeState: AnimeState = {
  recentAnime: null,
  favouriteAnime: null,
  popularAnime: null,
  error: null,
};
