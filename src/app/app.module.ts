import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgPipe } from './shared/pipes/img.pipe';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { BannerComponent } from './core/banner/banner.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CurouselComponent } from './shared/components/curousel/curousel.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { MovieBannerComponent } from './core/movie-banner/movie-banner.component';
import { OriginalIMGPipe } from './shared/pipes/original-img.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RelatedMoviesComponent } from './core/related-movies/related-movies.component';
import { AllMoviesComponent } from './pages/all-movies/all-movies.component';
import { AllMoviesBannerComponent } from './core/all-movies-banner/all-movies-banner.component';
import { AllTvShowsComponent } from './pages/all-tv-shows/all-tv-shows.component';
import { TvCurouselComponent } from './shared/components/tv-curousel/tv-curousel.component';
import { AllTvBannerComponent } from './core/all-tv-banner/all-tv-banner.component';
import { AllAnimeComponent } from './pages/all-anime/all-anime.component';
import { VideoComponent } from './core/video/video.component';
import { SearchComponent } from './core/search/search.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ImgPipe,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    BannerComponent,
    CurouselComponent,
    MoviePageComponent,
    MovieBannerComponent,
    OriginalIMGPipe,
    RelatedMoviesComponent,
    AllMoviesComponent,
    AllMoviesBannerComponent,
    AllTvShowsComponent,
    TvCurouselComponent,
    AllTvBannerComponent,
    AllAnimeComponent,
    VideoComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('602346929141-hqt2nr4mufrei3jua0ro2plqi8mnej8v.apps.googleusercontent.com')
          },
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],  bootstrap: [AppComponent]
})
export class AppModule { }
