import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { AllMoviesComponent } from './pages/all-movies/all-movies.component';
import { AllTvShowsComponent } from './pages/all-tv-shows/all-tv-shows.component';
import { AllAnimeComponent } from './pages/all-anime/all-anime.component';
import { VideoComponent } from './core/video/video.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: AllMoviesComponent},
  {path: 'tv', component: AllTvShowsComponent},
  {path: 'anime', component: AllAnimeComponent},
  {path: 'movie/:id', component: MoviePageComponent},
  {path: 'tv/:id', component: MoviePageComponent},
  {path: 'anime/:id', component: MoviePageComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
