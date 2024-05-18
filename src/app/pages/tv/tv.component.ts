import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { ItvCard } from 'src/app/core/models/Models.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent {
  index: number = 0;
  nowPlayingTV: ItvCard[] = [];
  trendingTV: ItvCard[] = [];
  topRatedTV: ItvCard[] = [];
  comedyTV: ItvCard[] = [];

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
        this.nowPlayingTV = res.nowPlayingTV.results as ItvCard[];
        this.trendingTV = res.trendingTV.results as ItvCard[];
        this.topRatedTV = res.topRatedTV.results as ItvCard[];
        this.comedyTV = res.comedyTV.results as ItvCard[];
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