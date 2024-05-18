import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import {
  IallAnimeResponse,
  IallMoviesResponse,
  IallTvResponse,
  IanimeCard,
  ImoviesCard,
  ItvCard,
} from 'src/app/core/models/Models.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  popularMovies: ImoviesCard[] = [];
  topRatedMovies: ImoviesCard[] = [];
  upcomingMovies: ImoviesCard[] = [];

  trendingTvShows: ItvCard[] = [];
  topRatedTvShows: ItvCard[] = [];
  comedyTvShows: ItvCard[] = [];

  recentAnime: IanimeCard[] = [];
  favouriteAnime: IanimeCard[] = [];
  popularAnime: IanimeCard[] = [];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private cachingService: DataCacheService
  ) {
    this.spinner.show();
  }

  MoviesApi = [
    this.apiService.getPopularMovies(),
    this.apiService.getTopRatedMovies(),
    this.apiService.getUpcomingMovies(),
    this.apiService.getNowPlayingMovies(),
  ];

  TVShowsApi = [
    this.apiService.getTrendingTv(),
    this.apiService.getTopRatedTv(),
    this.apiService.getComedyTv(),
    this.apiService.getNowPlayingTv(),
  ];

  AnimeApi = [
    this.apiService.getRecentReleasedAnime(1),
    this.apiService.getAllTimeFavoriteAnime(1),
    this.apiService.getPupularWeekAnime(1),
  ];

  ngOnInit(): void {
    const popularMovies = this.cachingService.get('popularMovies');
    if (!popularMovies) {
      this.fetchMoviesData();
      this.fetchTvShowsData();
      this.fetchAnimeData();
    } else {
      this.retrieveCachedData();
    }
  }

  retrieveCachedData() {
    // Movies
    this.popularMovies = this.cachingService.get('popularMovies');
    this.topRatedMovies = this.cachingService.get('topRatedMovies');
    this.upcomingMovies = this.cachingService.get('upcomingMovies');

    this.spinner.hide();
    // Tv Shows
    this.trendingTvShows = this.cachingService.get('trendingTvShows');
    this.topRatedTvShows = this.cachingService.get('topRatedTvShows');
    this.comedyTvShows = this.cachingService.get('comedyTvShows');
    // Anime
    this.recentAnime = this.cachingService.get('recentAnime');
    this.favouriteAnime = this.cachingService.get('favouriteAnime');
    this.popularAnime = this.cachingService.get('popularAnime');
    // console.log('cached',this.popularMovies,this.trendingTvShows,this.recentAnime)
  }

  fetchMoviesData() {
    forkJoin(this.MoviesApi)
      .pipe(
        map(([popularMovies, topRatedMovies, upcomingMovies, nowPlayingTV]) => {
          return {
            popularMovies,
            topRatedMovies,
            upcomingMovies,
            nowPlayingTV,
          };
        })
      )
      .subscribe((res: IallMoviesResponse) => {
        this.popularMovies = res.popularMovies.results as ImoviesCard[];
        this.topRatedMovies = res.topRatedMovies.results as ImoviesCard[];
        this.upcomingMovies = res.upcomingMovies.results as ImoviesCard[];
        this.spinner.hide();
        // Storing The Data To Service For Unnecery Api Calls
        this.cachingService.set('popularMovies', res.popularMovies.results);
        this.cachingService.set('topRatedMovies', res.topRatedMovies.results);
        this.cachingService.set('upcomingMovies', res.upcomingMovies.results);
        this.cachingService.set('nowPlayingMovies', res.nowPlayingTV.results);
      });
  }

  fetchTvShowsData() {
    forkJoin(this.TVShowsApi)
      .pipe(
        map(
          ([trendingTvShows, topRatedTvShows, comedyTvShows, nowPlayingTV]) => {
            return {
              trendingTvShows,
              topRatedTvShows,
              comedyTvShows,
              nowPlayingTV,
            };
          }
        )
      )
      .subscribe((res: IallTvResponse) => {
        this.trendingTvShows = res.trendingTvShows.results as ItvCard[];
        this.topRatedTvShows = res.topRatedTvShows.results as ItvCard[];
        this.comedyTvShows = res.comedyTvShows.results as ItvCard[];

        // Storing The Data To Service For Unnecery Api Calls
        this.cachingService.set('trendingTvShows', res.trendingTvShows.results);
        this.cachingService.set('topRatedTvShows', res.topRatedTvShows.results);
        this.cachingService.set('comedyTvShows', res.comedyTvShows.results);
        this.cachingService.set('nowPlayingTV', res.nowPlayingTV.results);
      });
  }

  fetchAnimeData() {
    forkJoin(this.AnimeApi)
      .pipe(
        map(([recentAnime, favouriteAnime, popularAnime]) => {
          return { recentAnime, favouriteAnime, popularAnime };
        })
      )
      .subscribe((res: IallAnimeResponse) => {
        this.recentAnime = res.recentAnime.results as IanimeCard[];
        this.favouriteAnime = res.favouriteAnime.results as IanimeCard[];
        this.popularAnime = res.popularAnime.results as IanimeCard[];

        this.cachingService.set('recentAnime', res.recentAnime.results);
        this.cachingService.set('favouriteAnime', res.favouriteAnime.results);
        this.cachingService.set('popularAnime', res.popularAnime.results);
      });
  }
}
