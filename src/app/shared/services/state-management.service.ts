import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  private moviesDataSubject = new BehaviorSubject<any>(null);
  moviesData$ = this.moviesDataSubject.asObservable();

  private tvShowsDataSubject = new BehaviorSubject<any>(null);
  tvShowsData$ = this.tvShowsDataSubject.asObservable();

  private animeDataSubject = new BehaviorSubject<any>(null);
  animeData$ = this.animeDataSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchMoviesData() {
    if (!this.moviesDataSubject.value) {
      this.apiService
        .getPopularMovies()
        .pipe(
          tap((popularMovies) =>
            this.moviesDataSubject.next({ popularMovies })
          ),
          tap(() =>
            this.apiService
              .getTopRatedMovies()
              .subscribe((topRatedMovies) =>
                this.moviesDataSubject.next({ topRatedMovies })
              )
          ),
          tap(() =>
            this.apiService
              .getUpcomingMovies()
              .subscribe((upcomingMovies) =>
                this.moviesDataSubject.next({ upcomingMovies })
              )
          )
        )
        .subscribe();
    }
  }

  fetchTvShowsData() {
    if (!this.tvShowsDataSubject.value) {
      this.apiService
        .getTrendingTv()
        .pipe(
          tap((trendingTvShows) =>
            this.tvShowsDataSubject.next({ trendingTvShows })
          ),
          tap(() =>
            this.apiService
              .getTopRatedTv()
              .subscribe((topRatedTvShows) =>
                this.tvShowsDataSubject.next({ topRatedTvShows })
              )
          ),
          tap(() =>
            this.apiService
              .getComedyTv()
              .subscribe((comedyTvShows) =>
                this.tvShowsDataSubject.next({ comedyTvShows })
              )
          )
        )
        .subscribe();
    }
  }

  fetchAnimeData() {
    if (!this.animeDataSubject.value) {
      this.apiService
        .getRecentReleasedAnime(1)
        .pipe(
          tap((recentAnime) => this.animeDataSubject.next({ recentAnime })),
          tap(() =>
            this.apiService
              .getAllTimeFavoriteAnime(1)
              .subscribe((favouriteAnime) =>
                this.tvShowsDataSubject.next({ favouriteAnime })
              )
          ),
          tap(() =>
            this.apiService
              .getPupularWeekAnime(1)
              .subscribe((popularAnime) =>
                this.tvShowsDataSubject.next({ popularAnime })
              )
          )
        )
        .subscribe();
    }
  }
}
