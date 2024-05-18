import { ImoviesCard, ImoviesResponse } from "../../models/Models.interface"; 

export interface MoviesState {
  popularMovies: ImoviesResponse | null;
  topRatedMovies: ImoviesResponse | null;
  upcomingMovies: ImoviesResponse | null;
  nowPlayingMovies: ImoviesResponse| null;
  error: any;
}

export const initialMoviesState: MoviesState = {
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  nowPlayingMovies: null,
  error: null,
};
