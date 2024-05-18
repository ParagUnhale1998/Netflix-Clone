import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent {
  @Input() relatedMoviesData:any
  @Input() relatedAnimesData:any
  @Input() relatedTvShowsData:any
  
  page: number = 1;
  
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

  onPageChange(newPage: number) {
    this.page = newPage;
    // Optionally, handle additional logic when the page changes
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
