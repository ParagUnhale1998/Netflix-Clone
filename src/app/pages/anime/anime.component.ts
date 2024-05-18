import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IanimeCard, IanimeResponse } from 'src/app/core/models/Models.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss']
})
export class AnimeComponent {

  index: number = 0;
  popularAnimes!: IanimeCard[];
  recentlyRelesedAnimes!: IanimeCard[];
  currentPage = 1;

  constructor(
    private animeService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cachingService: DataCacheService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    const popularAnime = this.cachingService.get('popularAnime');
    if (!popularAnime) {
      this.fetchAnimeData();
    } else {
      this.retrieveCachedData();
    }
  }

  retrieveCachedData() {
    this.popularAnimes = this.cachingService.get('popularAnime');
    this.recentlyRelesedAnimes = this.cachingService.get('recentAnime');    
    this.spinner.hide();
    this.sliderAnime();
  }


  fetchAnimeData() {
    this.animeService.getPupularWeekAnime(1).subscribe((res: IanimeResponse) => {
      this.popularAnimes = res.results;
    });
    this.animeService.getRecentReleasedAnime(1).subscribe((res: IanimeResponse) => {
      this.recentlyRelesedAnimes = res.results;
      this.spinner.hide();
    });
    this.sliderAnime();
  }

  fetchNextPage(nextpage: number) {
    this.spinner.show();
    this.currentPage = nextpage;
    this.animeService.getRecentReleasedAnime(nextpage).subscribe((res: any) => {
      this.recentlyRelesedAnimes = res.results;
      this.spinner.hide();
    });
  }
  sliderAnime() {
    setInterval(() => {
      if (this.index === 10) {
        this.index = 0;
        return;
      }
      this.index++;
    }, 5000);
  }

  navigateToAnime(id: any) {
    this.router.navigate(['anime', id]);
  }
}
