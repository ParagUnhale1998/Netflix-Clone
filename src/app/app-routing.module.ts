import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { AllMoviesComponent } from './pages/all-movies/all-movies.component';
import { AllTvShowsComponent } from './pages/all-tv-shows/all-tv-shows.component';
import { AllAnimeComponent } from './pages/all-anime/all-anime.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent,canActivate: [authGuard]},
  {path: 'movies', component: AllMoviesComponent,canActivate: [authGuard]},
  {path: 'tv', component: AllTvShowsComponent,canActivate: [authGuard]},
  {path: 'anime', component: AllAnimeComponent,canActivate: [authGuard]},
  {path: 'movie/:id', component: MoviePageComponent,canActivate: [authGuard]},
  {path: 'tv/:id', component: MoviePageComponent,canActivate: [authGuard]},
  {path: 'anime/:id', component: MoviePageComponent,canActivate: [authGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
