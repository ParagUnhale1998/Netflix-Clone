import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tv-banner',
  templateUrl: './all-tv-banner.component.html',
  styleUrls: ['./all-tv-banner.component.scss']
})
export class AllTvBannerComponent {
  @Input() TvShowsData!:any;
  

  constructor(private router:Router){}

  navigateToTv(id:any){
    this.router.navigate(['tv', id]);
  }
}
