import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable ,isDevMode} from '@angular/core';
import { Observable, catchError, forkJoin } from 'rxjs';
import {
  ANIME_ENDPOINTS,
  API_BASE_URL,
  DEFAULT_PARAMS,
  MOVIE_ENDPOINTS,
  SEARCH_ENDPOINT,
  TV_ENDPOINTS,
  TV_GENRES,
} from 'src/app/core/constants/api.constants';
import { IallAnimeResponse, IallMoviesResponse, IallTvResponse, IanimeResponse, ImoviesResponse, ItvResponse } from 'src/app/core/models/Models.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = API_BASE_URL;
  private readonly apiKey = environment.API_KEY;

  // private readonly headers = new HttpHeaders({
  //   'accept':'application/json',
  //   'Authorization':`Bearer ${ACCESS_TOKEN}`
  // })

  private readonly defaultParams = {
    ...DEFAULT_PARAMS,
  };

  private readonly tvEndpoints = TV_ENDPOINTS;
  private readonly tvGenres = TV_GENRES;

  constructor(private http: HttpClient) {
  }

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

  // private buildOptions(params?: any): { headers: HttpHeaders, params: HttpParams } {
  //   const httpParams = new HttpParams({ fromObject: { ...this.defaultParams, ...params } });
  //   return { headers: this.headers, params: httpParams };
  // }

  private buildOptions(params?: any): { params: HttpParams } {
    const httpParams = new HttpParams({
      fromObject: { ...this.defaultParams, ...params },
    });
    return { params: httpParams };
  }

  private get(endpoint: string, params?: any): Observable<any> {
    const options = this.buildOptions(params);
    return this.http
      .get(this.getFullUrl(endpoint), options)
      .pipe(catchError(this.handleError));
  }

  private getGenreIdByName(genreName: string): number | undefined {
    const genre = this.tvGenres.find((genre) => genre.name === genreName);
    return genre ? genre.id : undefined;
  }

  private getWithGenreParams(genreName: string): any {
    const genreId = this.getGenreIdByName(genreName);
    return genreId ? { with_genres: genreId.toString() } : {};
  }

  //Movies

  getTopRatedMovies(): Observable<any> {
    return this.get(MOVIE_ENDPOINTS.TOP_RATED);
  }

  getPopularMovies(): Observable<any> {
    return this.get(MOVIE_ENDPOINTS.POPULAR);
  }

  getUpcomingMovies(): Observable<any> {
    return this.get(MOVIE_ENDPOINTS.UPCOMING);
  }

  getNowPlayingMovies(): Observable<any> {
    return this.get(MOVIE_ENDPOINTS.NOW_PLAYING);
  }

  getMovieById(movieId: any): Observable<any> {
    return this.get(`${MOVIE_ENDPOINTS.NORMAL}/${movieId}`);
  }

  getMovieKeywords(movieId: any): Observable<any> {
    return this.get(`${MOVIE_ENDPOINTS.NORMAL}/${movieId}/keywords`);
  }

  getMovieRelated(movieId: any): Observable<any> {
    return this.get(`${MOVIE_ENDPOINTS.NORMAL}/${movieId}/recommendations`);
  }

  // Tv Shows

  getTrendingTv(): Observable<any> {
    return this.get(TV_ENDPOINTS.TRENDING);
  }

  // getComedyTv(): Observable<any> {
  //   return this.get(TV_ENDPOINTS.COMEDY, { with_genres: '35' });
  // }

  getComedyTv(): Observable<any> {
    const genreParams = this.getWithGenreParams('Comedy'); // get name from constants
    return this.get(this.tvEndpoints.COMEDY, genreParams);
  }

  getTopRatedTv(): Observable<any> {
    return this.get(TV_ENDPOINTS.TOP_RATED);
  }

  getNowPlayingTv(): Observable<any> {
    return this.get(TV_ENDPOINTS.NOW_PLAYING);
  }

  getTvShowByID(tvShowId: number): Observable<any> {
    return this.get(`${TV_ENDPOINTS.NORMAL}/${tvShowId}`);
  }

  getTvShowKeywords(tvShowId: any): Observable<any> {
    return this.get(`${TV_ENDPOINTS.NORMAL}/${tvShowId}/keywords`);
  }

  getTvShowRelated(tvShowId: any): Observable<any> {
    return this.get(`${TV_ENDPOINTS.NORMAL}/${tvShowId}/recommendations`);
  }

  // Anime

  getRecentReleasedAnime(page: number): Observable<any> {
    return this.get(ANIME_ENDPOINTS.RECENT_RELEASED, {
      page,
      sort_by: 'first_air_date.desc',
      with_genres: '16',
      with_original_language: 'ja',
    });
  }

  getPupularWeekAnime(page: number): Observable<any> {
    return this.get(ANIME_ENDPOINTS.POPULAR_WEEK, {
      page,
      sort_by: 'popularity.desc',
      'air_date.gte': '2024-05-05',
      with_genres: '16',
      with_original_language: 'ja',
    });
  }

  getAllTimeFavoriteAnime(page: number): Observable<any> {
    return this.get(ANIME_ENDPOINTS.ALL_TIME_FAVORITE, {
      page,
      sort_by: 'popularity.desc',
      'air_date.gte': '1900-01-01',
      with_genres: '16',
      with_original_language: 'ja',
    });
  }

  getAnimeByID(animeId: number): Observable<any> {
    return this.get(`${ANIME_ENDPOINTS.NORMAL}/${animeId}`);
  }

  getAnimeKeywords(animeId: any): Observable<any> {
    return this.get(`${ANIME_ENDPOINTS.NORMAL}/${animeId}/keywords`);
  }

  getAnimeRelated(animeId: any): Observable<any> {
    return this.get(`${ANIME_ENDPOINTS.NORMAL}/${animeId}/recommendations`);
  }

  // Search

  searchMulti(searchInput: any): Observable<any> {
    return this.get(SEARCH_ENDPOINT, { query: searchInput });
  }

  // call multiple api for store ngrx
  getMoviesData(): Observable<{ popularMovies: ImoviesResponse, topRatedMovies: ImoviesResponse, upcomingMovies: ImoviesResponse, nowPlayingMovies: ImoviesResponse }> {
    return forkJoin({
      popularMovies: this.getPopularMovies(),
      topRatedMovies: this.getTopRatedMovies(),
      upcomingMovies: this.getUpcomingMovies(),
      nowPlayingMovies: this.getNowPlayingMovies()
    });
  }
  getAnimeData(): Observable<{ recentAnime: IanimeResponse, favouriteAnime: IanimeResponse, popularAnime: IanimeResponse }> {
    return forkJoin({
      recentAnime: this.getRecentReleasedAnime(1),
      favouriteAnime: this.getAllTimeFavoriteAnime(1),
      popularAnime: this.getPupularWeekAnime(1)
    });
  }

  getTvShowsData(): Observable<{ trendingTvShows: ItvResponse, topRatedTvShows: ItvResponse, comedyTvShows: ItvResponse, nowPlayingTvShows: ItvResponse }> {
    return forkJoin({
      trendingTvShows: this.getTrendingTv(),
      topRatedTvShows: this.getTopRatedTv(),
      comedyTvShows: this.getComedyTv(),
      nowPlayingTvShows: this.getNowPlayingTv()
    });
  }
}
