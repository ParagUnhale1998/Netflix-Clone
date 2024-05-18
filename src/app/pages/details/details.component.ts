import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IanimeCard, IanimeID, IanimeKeywordResponse, IanimeKeywordResult, IanimeResponse, ImovieID, ImovieKeywordResponse, ImovieKeywordResult, ImoviesCard, ImoviesResponse, ItvCard, ItvID, ItvKeywordResponse, ItvKeywordResult, ItvResponse } from 'src/app/core/models/Models.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  movie!: ImovieID;
  anime!: IanimeID;
  tvshow!: ItvID;

  relatedMovies!: ImoviesCard[];
  relatedAnimes!: IanimeCard[];
  relatedTvshows!: ItvCard[];

  keywords: any[] = [];
  page = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService,private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.spinner.show();
        const path = this.route.snapshot.url[0].path;
        switch (path) {
          case 'movie':
            this.fetchMovieData(id);
            break;
          case 'tv':
            this.fetchTvShowData(id);
            break;
          case 'anime':
            this.fetchAnimeData(id);
            break;
          default:
            console.error('Invalid route');
        }
      }
    });
  }

  fetchMovieData(id: any) {
    this.apiService.getMovieById(id).subscribe((res:ImovieID) => {
      this.movie = res as ImovieID;
          this.spinner.hide()
    });
    this.apiService.getMovieRelated(id).subscribe((res: ImoviesResponse) => {
      this.relatedMovies = res.results as ImoviesCard[]
    });

    this.apiService.getMovieKeywords(id).subscribe((res: ImovieKeywordResponse) => {
      this.keywords = res.keywords as ImovieKeywordResult[]
    });
  }

  fetchAnimeData(id: any) {
    this.apiService.getAnimeByID(id).subscribe((res:IanimeID) => {
      this.anime = res as IanimeID;
          this.spinner.hide()
    });
    this.apiService.getAnimeRelated(id).subscribe((res: IanimeResponse) => {
      this.relatedAnimes = res.results  as IanimeCard[]
      if(this.relatedAnimes.length === 0){
         this.apiService.getAllTimeFavoriteAnime(1).subscribe((res:IanimeResponse) => {
      this.relatedAnimes = res.results  as IanimeCard[]
     })
      }
      
    });

    this.apiService.getAnimeKeywords(id).subscribe((res:IanimeKeywordResponse) => {
      this.keywords = res.results as IanimeKeywordResult[]
    })
  }

  fetchTvShowData(id: any) {
    this.apiService.getTvShowByID(id).subscribe((res:ItvID) => {
      this.tvshow = res as ItvID;
          this.spinner.hide()
    });
    this.apiService.getTvShowRelated(id).subscribe((res: ItvResponse) => {
      this.relatedTvshows = res.results as ItvCard[]
    });

    this.apiService.getTvShowKeywords(id).subscribe((res: ItvKeywordResponse) => {
      this.keywords = res.results as ItvKeywordResult[]
    });
  }
}