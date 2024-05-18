import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-main',
  templateUrl: './banner-main.component.html',
  styleUrls: ['./banner-main.component.scss']
})
export class BannerMainComponent {
  @Input() mediaData: any;

  constructor(private router: Router) {}

  navigateToDetails() {
    if (this.mediaData.id) {
      const route = this.mediaData.first_air_date ? 'tv' : 'movie';
      this.router.navigate([route, this.mediaData.id]);
    }
  }
}
