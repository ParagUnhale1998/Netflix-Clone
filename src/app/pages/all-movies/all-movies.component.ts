import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { Tv } from 'src/app/models/IMDB.interface';
import { IvideoContent } from 'src/app/models/Video-content.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss'],
})
export class AllMoviesComponent {
  movie: any;
  index: number = 0;
  nowPlayingMovies: IvideoContent[] = [];
  popularMovies: IvideoContent[] = [];
  topRatedMovies: IvideoContent[] = [];
  upcomingMovies: IvideoContent[] = [];

  sources = [
    this.movieApiservice.getNowPlayingMovies(),
    this.movieApiservice.getPopularMovies(),
    this.movieApiservice.getTopRatedMovies(),
    this.movieApiservice.getUpcomingMovies(),
  ];

  constructor(
    private movieApiservice: ApiService,
    private spinner: NgxSpinnerService,
    private cachingService: DataCacheService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    const nowPlayingMovies = this.cachingService.get('nowPlayingMovies');
    if (!nowPlayingMovies) {
      this.fetchAllMovies();
    } else {
      this.retrieveCachedData();
    }
  }

  retrieveCachedData() {
    // Movies
    this.nowPlayingMovies = this.cachingService.get('nowPlayingMovies');
    this.popularMovies = this.cachingService.get('popularMovies');
    this.topRatedMovies = this.cachingService.get('topRatedMovies');
    this.upcomingMovies = this.cachingService.get('upcomingMovies');
    this.sliderMovies();
    this.spinner.hide();

  }


  fetchAllMovies() {
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
          ]) => {
            return {
              nowPlayingMovies,
              popularMovies,
              topRatedMovies,
              upcomingMovies,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.nowPlayingMovies = res.nowPlayingMovies.results as IvideoContent[];
        this.popularMovies = res.popularMovies.results as IvideoContent[];
        this.topRatedMovies = res.topRatedMovies.results as IvideoContent[];
        this.upcomingMovies = res.upcomingMovies.results as IvideoContent[];
        this.sliderMovies();
        this.spinner.hide();
      });
  }


  sliderMovies() {
    setInterval(() => {
      if (this.index === 10) {
        this.index = 0;
        return;
      }
      this.index++;
    }, 5000);
  }
}


/* old code

  nowPlayingTV: Tv[] = [];
  trendingTV: Tv[] = [];
  topRatedTV: Tv[] = [];
  comedyTV: Tv[] = [];

  sources = [
    this.movieApiservice.getNowPlayingMovies(),
    this.movieApiservice.getPopularMovies(),
    this.movieApiservice.getTopRatedMovies(),
    this.movieApiservice.getUpcomingMovies(),
  ];

  sources2 = [
    this.movieApiservice.getNowPlayingTv(),
    this.movieApiservice.getTrendingTv(),
    this.movieApiservice.getTopRatedTv(),
    this.movieApiservice.getComedyTv(),
  ];

  constructor(
    private movieApiservice: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.fetchAllMovies();
    // this.fetchAllTVShows();
  }

  fetchAllMovies() {
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
          ]) => {
            return {
              nowPlayingMovies,
              popularMovies,
              topRatedMovies,
              upcomingMovies,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.nowPlayingMovies = res.nowPlayingMovies.results as IvideoContent[];
        this.popularMovies = res.popularMovies.results as IvideoContent[];
        this.topRatedMovies = res.topRatedMovies.results as IvideoContent[];
        this.upcomingMovies = res.upcomingMovies.results as IvideoContent[];
        this.sliderMovies();
        console.log(this.nowPlayingMovies);
        console.log(this.popularMovies);
        console.log(this.topRatedMovies);
        this.spinner.hide();
      });
  }

  fetchAllTVShows() {
    forkJoin(this.sources)
      .pipe(
        map(([nowPlayingTV, trendingTV, topRatedTV, comedyTV]) => {
          return { nowPlayingTV, trendingTV, topRatedTV, comedyTV };
        })
      )
      .subscribe((res: any) => {
        this.nowPlayingTV = res.nowPlayingTV.results as Tv[];
        this.trendingTV = res.trendingTV.results as Tv[];
        this.topRatedTV = res.topRatedTV.results as Tv[];
        this.comedyTV = res.comedyTV.results as Tv[];
        this.sliderMovies();
        console.log(this.nowPlayingMovies);
        console.log(this.popularMovies);
        console.log(this.topRatedMovies);
      });
  }

  sliderMovies() {
    setInterval(() => {
      if (this.index === 10) {
        this.index = 0;
        return;
      }
      this.index++;
    }, 5000);
  }
}


*/