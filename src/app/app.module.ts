import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { TVComponent } from './pages/tv/tv.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { LoginHomeComponent } from './pages/login-home/login-home.component';
import { DetailsComponent } from './pages/details/details.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { moviesReducer } from './core/store/reducers/movies.reducer';
import { tvShowsReducer } from './core/store/reducers/tvshows.reducer';
import { animeReducer } from './core/store/reducers/anime.reducer';
import { MoviesEffects } from './core/store/effects/movies.effects';
import { TvShowsEffects } from './core/store/effects/tvshows.effects';
import { AnimeEffects } from './core/store/effects/anime.effects';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TVComponent,
    MovieComponent,
    AnimeComponent,
    LoginHomeComponent,
    DetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({
      movies: moviesReducer,
      tvShows: tvShowsReducer,
      anime: animeReducer
    }),
    EffectsModule.forRoot([MoviesEffects, TvShowsEffects, AnimeEffects]),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
