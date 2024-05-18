import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImgPipe } from './pipes/img.pipe';
import { OriginalIMGPipe } from './pipes/original-img.pipe';
import { ScrollDirective } from './directives/scroll.directive';
import { CurouselComponent } from './components/curousel/curousel.component';
import { RelatedComponent } from './components/related-page/related/related.component';
import { CardComponent } from './components/related-page/card/card.component';
import { PaginationComponent } from './components/related-page/pagination/pagination.component';
import { BannerDetailsComponent } from './components/details-banner/banner-details/banner-details.component';
import { MediaDetailsComponent } from './components/details-banner/media-details/media-details.component';
import { KeywordsDetailsComponent } from './components/details-banner/keywords-details/keywords-details.component';
import { BannerHomeComponent } from './components/banners/banner-home/banner-home.component';
import { BannerMainComponent } from './components/banners/banner-main/banner-main.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    VideosComponent,
    ImgPipe,
    OriginalIMGPipe,
    ScrollDirective,
    CurouselComponent,
    RelatedComponent,
    CardComponent,
    PaginationComponent,
    BannerDetailsComponent,
    MediaDetailsComponent,
    KeywordsDetailsComponent,
    BannerHomeComponent,
    BannerMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    SocialLoginModule,
    NgxSpinnerModule
  ],
  exports:[
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    VideosComponent,
    ImgPipe,
    OriginalIMGPipe,
    ScrollDirective,
    CurouselComponent,
    RelatedComponent,
    CardComponent,
    PaginationComponent,
    BannerDetailsComponent,
    MediaDetailsComponent,
    KeywordsDetailsComponent,
    BannerHomeComponent,
    BannerMainComponent,
    HttpClientModule,
    NgxPaginationModule,
    SocialLoginModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
