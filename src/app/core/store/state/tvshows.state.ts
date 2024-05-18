import { ItvCard, ItvResponse } from "../../models/Models.interface"; 

export interface TvShowsState {
  trendingTvShows: ItvResponse | null;
  topRatedTvShows: ItvResponse | null;
  comedyTvShows: ItvResponse | null;
  nowPlayingTV: ItvResponse | null;
  error: any;
}

export const initialTvShowsState: TvShowsState = {
  trendingTvShows: null,
  topRatedTvShows: null,
  comedyTvShows: null,
  nowPlayingTV: null,
  error: null,
};
