import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomeComponent } from './pages/login-home/login-home.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { TVComponent } from './pages/tv/tv.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { DetailsComponent } from './pages/details/details.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
{path: '', component: LoginHomeComponent},
{path: 'login', component: LoginHomeComponent},
{path: 'home', component: HomeComponent,canActivate: [authGuard]},
{path: 'movies', component: MovieComponent,canActivate: [authGuard]},
{path: 'tv', component: TVComponent,canActivate: [authGuard]},
{path: 'anime', component: AnimeComponent,canActivate: [authGuard]},
{path: 'movie/:id', component: DetailsComponent,canActivate: [authGuard]},
{path: 'tv/:id', component: DetailsComponent,canActivate: [authGuard]},
{path: 'anime/:id', component: DetailsComponent,canActivate: [authGuard]},
{ path: '**', redirectTo: '/', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
