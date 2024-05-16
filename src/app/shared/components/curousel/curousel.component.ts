import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IvideoContent } from 'src/app/models/Video-content.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-curousel',
  templateUrl: './curousel.component.html',
  styleUrls: ['./curousel.component.scss'],
})
export class CurouselComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  @Input() videocontent: any[] = [];
  @Input() title: string = '';
  @Input() category: string = '';

  constructor(private router: Router) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSwiper();
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



  navigateToContent(id: any) {
    switch(this.category) {
      case 'movie':
        this.router.navigate(['movie', id]);
        break;
      case 'anime':
        this.router.navigate(['anime', id]);
        break;
      case 'tv':
        this.router.navigate(['tv', id]);
        break;
      default:
        // Handle default case if necessary
        break;
    }}
}
