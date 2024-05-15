import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  showTrailerVideo: boolean = false;
  constructor(
    private domSanitizer: DomSanitizer,
    private moviesService: ApiService
  ) {}
  videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/b9EkMc79ZSU?&autoplay=1&loop=1&mute=1&controls=0'
  );

  ngOnInit(): void {}

  showTrailer() {
    this.showTrailerVideo = true;
  }
  closeVideo() {
    this.showTrailerVideo = false
  }
}
