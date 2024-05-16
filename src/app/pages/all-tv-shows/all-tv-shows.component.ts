import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { Tv } from 'src/app/models/IMDB.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-all-tv-shows',
  templateUrl: './all-tv-shows.component.html',
  styleUrls: ['./all-tv-shows.component.scss'],
})
export class AllTvShowsComponent {
  index: number = 0;
  nowPlayingTV: Tv[] = [];
  trendingTV: Tv[] = [];
  topRatedTV: Tv[] = [];
  comedyTV: Tv[] = [];

  sources2 = [
    this.movieApiservice.getNowPlayingTv(),
    this.movieApiservice.getTrendingTv(),
    this.movieApiservice.getTopRatedTv(),
    this.movieApiservice.getComedyTv(),
  ];

  constructor(
    private movieApiservice: ApiService,
    private spinner: NgxSpinnerService,
    private cachingService: DataCacheService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    const nowPlayingTV = this.cachingService.get('nowPlayingTV');
    if (!nowPlayingTV) {
      this.fetchAllTVShows();
    } else {
      this.retrieveCachedData();
    }
  }

  retrieveCachedData() {
    this.nowPlayingTV = this.cachingService.get('nowPlayingTV');
    this.trendingTV = this.cachingService.get('trendingTvShows');
    this.topRatedTV = this.cachingService.get('topRatedTvShows');
    this.comedyTV = this.cachingService.get('comedyTvShows');
    // console.log('cached', this.nowPlayingTV, this.trendingTV, this.topRatedTV);
    this.spinner.hide();
    this.sliderMovies();
  }

  fetchAllTVShows() {
    forkJoin(this.sources2)
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

  sources2 = [
    this.movieApiservice.getNowPlayingTv(),
    this.movieApiservice.getTrendingTv(),
    this.movieApiservice.getTopRatedTv(),
    this.movieApiservice.getComedyTv(),
  ];
  constructor(private movieApiservice: ApiService,private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();

    this.fetchAllTVShows();
  }
  fetchAllTVShows() {
    forkJoin(this.sources2)
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
*/
