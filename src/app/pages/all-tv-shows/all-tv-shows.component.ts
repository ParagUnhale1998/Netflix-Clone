import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Tv } from 'src/app/models/IMDB.interface';
import { ApiService } from 'src/app/shared/services/api.service';

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
  constructor(private movieApiservice: ApiService) {}
  ngOnInit(): void {
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
