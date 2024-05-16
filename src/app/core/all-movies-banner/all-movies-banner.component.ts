import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/IMDB.interface';

@Component({
  selector: 'app-all-movies-banner',
  templateUrl: './all-movies-banner.component.html',
  styleUrls: ['./all-movies-banner.component.scss']
})
export class AllMoviesBannerComponent {
  @Input() movieData!:any;

 constructor(private router:Router){}

  navigateToMovie(id:any){
    this.router.navigate(['movie', id]);
  }
}
