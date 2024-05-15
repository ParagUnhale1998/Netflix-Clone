import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tv } from 'src/app/models/IMDB.interface';
import { IvideoContent } from 'src/app/models/Video-content.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-tv-curousel',
  templateUrl: './tv-curousel.component.html',
  styleUrls: ['./tv-curousel.component.scss']
})
export class TvCurouselComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  @Input() tvContent: Tv[] = []
  @Input() title:string = ''

  constructor(private router:Router){}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initSwiper()
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 3,
      centeredSlides: false,
      loop: false,
      breakpoints: {
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 3,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 4,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 4,
          centeredSlides: false,
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 4,
          spaceBetween: 4,
          centeredSlides: false,
        },
        1536: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }


  navigateToTvShows(id:any){
    this.router.navigate(['tv', id]);
  }
}
