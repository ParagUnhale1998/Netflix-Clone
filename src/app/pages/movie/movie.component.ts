import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { ImoviesCard } from 'src/app/core/models/Models.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movie: any;
  index: number = 0;
  nowPlayingMovies: ImoviesCard[] = [];
  popularMovies: ImoviesCard[] = [];
  topRatedMovies: ImoviesCard[] = [];
  upcomingMovies: ImoviesCard[] = [];

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
        this.nowPlayingMovies = res.nowPlayingMovies.results as ImoviesCard[];
        this.popularMovies = res.popularMovies.results as ImoviesCard[];
        this.topRatedMovies = res.topRatedMovies.results as ImoviesCard[];
        this.upcomingMovies = res.upcomingMovies.results as ImoviesCard[];
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