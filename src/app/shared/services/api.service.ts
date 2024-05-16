import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
// import { IvideoContent } from 'src/app/models/Video-content.interface';
import { API_BASE_URL,API_KEY,ACCESS_TOKEN,LANGUAGE,DEFAULT_PARAMS ,MOVIE_ENDPOINTS,TV_ENDPOINTS,ANIME_ENDPOINTS,SEARCH_ENDPOINT,MOVIE_GENRES,TV_GENRES} from '../constants/api.constants'; 



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
private readonly baseUrl = API_BASE_URL
private readonly apiKey = API_KEY

// private readonly headers = new HttpHeaders({
//   'accept':'application/json',
//   'Authorization':`Bearer ${ACCESS_TOKEN}`
// })

private readonly defaultParams = {
...DEFAULT_PARAMS
};

private readonly tvEndpoints = TV_ENDPOINTS;
private readonly tvGenres = TV_GENRES;

constructor(private http: HttpClient) { }

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

private buildOptions(params?: any): {params: HttpParams } {
  const httpParams = new HttpParams({ fromObject: { ...this.defaultParams, ...params } });
  return {params: httpParams };
}

private get(endpoint: string, params?: any): Observable<any> {
  const options = this.buildOptions(params);
  return this.http.get(this.getFullUrl(endpoint), options).pipe(
    catchError(this.handleError)
  );
}

private getGenreIdByName(genreName: string): number | undefined {
  const genre = this.tvGenres.find(genre => genre.name === genreName);
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
  return this.get(ANIME_ENDPOINTS.RECENT_RELEASED, { page, sort_by: 'first_air_date.desc', with_genres: '16', with_original_language: 'ja' });
}

getPupularWeekAnime(page: number): Observable<any> {
  return this.get(ANIME_ENDPOINTS.POPULAR_WEEK, { page, sort_by: 'popularity.desc', 'air_date.gte': '2024-05-05', with_genres: '16', with_original_language: 'ja' });
}

getAllTimeFavoriteAnime(page: number): Observable<any> {
  return this.get(ANIME_ENDPOINTS.ALL_TIME_FAVORITE, { page, sort_by: 'popularity.desc', 'air_date.gte': '1900-01-01', with_genres: '16', with_original_language: 'ja' });
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

}

/*
private readonly baseUrl = 'https://api.themoviedb.org/3'
private readonly apiKey = 'b08b3db0727428549f0e771a528c714c'

private readonly headers = new HttpHeaders({
  'accept':'application/json',
  'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78`
})

private readonly defaultParams = {
  include_adult: 'false',
  include_video: 'true',
  language: 'en-US',
  sort_by: 'popularity.desc',
  page: '1'
};

constructor(private http: HttpClient) { }

private getFullUrl(endpoint: string): string {
  return `${this.baseUrl}/${endpoint}`;
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  throw error;
}

private buildOptions(params?: any): { headers: HttpHeaders, params: HttpParams } {
  const httpParams = new HttpParams({ fromObject: { ...this.defaultParams, ...params } });
  return { headers: this.headers, params: httpParams };
}

private get(endpoint: string, params?: any): Observable<any> {
  const options = this.buildOptions(params);
  return this.http.get(this.getFullUrl(endpoint), options).pipe(
    catchError(this.handleError)
  );
}


//Movies



getTopRatedMovies(): Observable<any> {
  return this.get('movie/top_rated');
}

getPopularMovies(): Observable<any> {
  return this.get('movie/popular');
}

getUpcomingMovies(): Observable<any> {
  return this.get('movie/upcoming');
}

getMovieById(movieId: any): Observable<any> {
  return this.get(`movie/${movieId}`);
}

getMovieKeywords(movieId: any): Observable<any> {
  return this.get(`movie/${movieId}/keywords`);
}

getMovieRelated(movieId: any): Observable<any> {
  return this.get(`movie/${movieId}/recommendations`);
}

getNowPlayingMovies(): Observable<any> {
  return this.get(`movie/now_playing`);
}


// Tv Shows

getTrendingTv(): Observable<any> {
  return this.get('trending/tv/week');
}

getComedyTv(): Observable<any> {
  return this.get('discover/tv', { with_genres: '35' });
}

getTopRatedTv(): Observable<any> {
  return this.get('tv/top_rated');
}

getNowPlayingTv(): Observable<any> {
  return this.get('tv/on_the_air');
}

getTvShowByID(tvShowId:number){
  return this.get(`tv/${tvShowId}`)
}

getTvShowKeywords(tvShowId:any){
  return this.get(`tv/${tvShowId}/keywords`)
}
getTvShowRelated(tvShowId:any){
  return this.http.get(`tv/${tvShowId}/recommendations`)
}


 // Anime

 getRecentReleasedAnime(page: number): Observable<any> {
  return this.get('discover/tv', { page, sort_by: 'first_air_date.desc', with_genres: '16', with_original_language: 'ja' });
}

getPupularWeekAnime(page: number): Observable<any> {
  return this.get('discover/tv', { page, sort_by: 'popularity.desc', 'air_date.gte': '2024-05-05', with_genres: '16', with_original_language: 'ja' });
}

getAllTimeFavoriteAnime(page: number): Observable<any> {
  return this.get('discover/tv', { page, sort_by: 'popularity.desc', 'air_date.gte': '1900-01-01', with_genres: '16', with_original_language: 'ja' });
}

getAnimeByID(animeId: number): Observable<any> {
  return this.get(`tv/${animeId}`, { include_adult: 'false', language: 'en-US' });
}

getAnimeKeywords(animeId: any): Observable<any> {
  return this.get(`tv/${animeId}/keywords`);
}

getAnimeRelated(animeId: any): Observable<any> {
  return this.get(`tv/${animeId}/recommendations`);
}

// Search

searchMulti(searchInput: any): Observable<any> {
  return this.get('search/multi', { query: searchInput });
}

}*/

 /*
 const options = {
   headers :{
    'accept': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78`
  },

   params : {
    include_adult:'false',
    include_video:'true',
    language: 'en-US',
    sort_by: 'popularity.desc',
    page:'1'

  }
}

const headers = {
  headers :{
    'accept': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78`
  },
}

  private urlMovie = 'https://api.themoviedb.org/3/movie';
  private urlTv = 'https://api.themoviedb.org/3/tv';
  private accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78';
  private apiKey = 'b08b3db0727428549f0e771a528c714c'

  constructor(private http: HttpClient) { }

  getTopRatedMovies() {
    return this.http.get(`${this.urlMovie}/top_rated`, options);
  }
  getPopularMovies(){
    return this.http.get(`${this.urlMovie}/popular`, options);
  }
  getUpcomingMovies() {
    return this.http.get(`${this.urlMovie}/upcoming`, options);
  }
  getMovieById(movieId:any){
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`)
  }
  getMovieKeywords(movieId:any){
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${this.apiKey}`)
  }
  getMovieRelated(movieId:any){
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,headers)
  }
  getNowPlayingMovies(){
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,headers)
  }

  // TV Shows
  TrendingTv= `https://api.themoviedb.org/3/trending/tv/week?language=en-US`
  TopRatedTv= `https://api.themoviedb.org/3/tv/top_rated?language=en-US`
  ComedyTv= `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=35`
  NowPlayingTv= `https://api.themoviedb.org/3/tv/on_the_air?page=1&with_original_language=en`

  getTrendingTv(){
    return this.http.get(this.TrendingTv,headers)
  }
  
  getComedyTv(){
    return this.http.get(this.ComedyTv,headers)
  }

  getTopRatedTv(){
    return this.http.get(this.TopRatedTv,headers)
  }

  getNowPlayingTv(){
    return this.http.get(this.NowPlayingTv,headers)
  }

  animeURLRecentReleased = 'https://api.themoviedb.org/3/discover/tv?page=1&sort_by=first_air_date.desc&with_genres=16&with_keywords=210024&without_keywords=278823&with_original_language=en-US';
  animeURLPopularWeek = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&air_date.gte=2024-05-05&with_genres=16&with_original_language=ja';

  getRecentReleasedAnime(page:number){
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=first_air_date.desc&with_genres=16&with_keywords=210024&without_keywords=278823&with_original_language=ja`,headers)
  }
  getPupularWeekAnime(page:number){
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc&air_date.gte=2024-05-05&with_genres=16&with_original_language=ja`,headers)
  }
  getAllTimeFavoriteAnime(page:number){
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc&air_date.gte=1900-01-01&with_genres=16&with_original_language=ja`,headers)
  }

  getAnimeByID(animeId:number){
    return this.http.get(`https://api.themoviedb.org/3/tv/${animeId}?include_adult=false&language=en-US&page=1`,headers)
    // return this.http.get(`https://api.themoviedb.org/3/tv/${animeId}?api_key=${this.apiKey}`)
  }
  getAnimeKeywords(animeId:any){
    return this.http.get(`https://api.themoviedb.org/3/tv/${animeId}/keywords`,headers)
  }
  getAnimeRelated(animeId:any){
    return this.http.get(`https://api.themoviedb.org/3/tv/${animeId}/recommendations?language=en-US&page=1`,headers)
  }
 

  getTvShowByID(tvShowId:number){
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvShowId}?include_adult=false&language=en-US&page=1`,headers)
    // return this.http.get(`https://api.themoviedb.org/3/tv/${animeId}?api_key=${this.apiKey}`)
  }
  getTvShowKeywords(tvShowId:any){
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvShowId}/keywords`,headers)
  }
  getTvShowRelated(tvShowId:any){
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?language=en-US&page=1`,headers)
  }

 

  // for search all tv and movies
  // const url = 'https://api.themoviedb.org/3/search/multi?query=wwe&include_adult=false&language=en-US&page=1';
  searchMulti(searchInput:any){
    return this.http.get(`https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=en-US&page=1`,headers)
  }
}
*/