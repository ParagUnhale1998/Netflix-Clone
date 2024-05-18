import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.scss']
})
export class BannerHomeComponent {
  showTrailerVideo: boolean = false;
  constructor(
    private domSanitizer: DomSanitizer,
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
