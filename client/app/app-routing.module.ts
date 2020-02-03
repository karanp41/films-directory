/**
 * Created by Krishan Pal on 01-02-2020.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmDetailComponent } from './components/films/film.detail.component';
import { FilmFormComponent } from './components/films/film.form.component';
import { FilmsComponent } from './components/films/films.component';
import { ProfileComponent } from './components/user/profile.component';
import { UserComponent } from './components/user/user.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'films'
  },
  {
    path: 'films',
    component: FilmsComponent
  },
  {
    path: 'film/detail/:slug',
    component: FilmDetailComponent
  },
  {
    path: 'film/new',
    component: FilmFormComponent
  },
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'signup',
    component: UserComponent
  },
  {
    path: 'logout',
    component: UserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '**',
    component: FilmsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
