import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.scss']
})
export class BannerDetailsComponent {
  @Input() movieData: any;
  @Input() animeData: any;
  @Input() tvShowData: any;
  @Input() keywords: any[] = [];
  
  showVideo: boolean = false;

  constructor() { }

  toggleVideo() {
    this.showVideo = !this.showVideo;
  }

  closeVideo() {
    this.showVideo = false;
  }
}
