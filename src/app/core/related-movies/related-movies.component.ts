import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-related-movies',
  templateUrl: './related-movies.component.html',
  styleUrls: ['./related-movies.component.scss']
})
export class RelatedMoviesComponent implements AfterViewInit{
@Input() relatedMoviesData:any
@Input() relatedAnimesData:any
@Input() relatedTvShowsData:any

page = 1;

constructor(private router:Router,private route: ActivatedRoute,private apiService:ApiService){

  
}

navigateToMovie(id:any){
  this.router.navigate(['movie', id]);
}
navigateToAnime(id:any){
  this.router.navigate(['anime', id]);
}
navigateToTv(id:any){
  this.router.navigate(['tv', id]);
}
ngAfterViewInit(): void {
  // this.route.paramMap.subscribe((params) => {
  //   const id = params.get('id');
  //   if (id) {
  //     const path = this.route.snapshot.url[0].path;
  //   if(path == 'anime'){
  //     if(this.relatedAnimesData.length === 0){
  //       this.apiService.getAllTimeFavoriteAnime(1).subscribe((res:any) => {
  //         this.relatedAnimesData = res.results
  //         console.log(res)
  //       })
  //     }
  //   }
  
  //   }
  // })
}

}
