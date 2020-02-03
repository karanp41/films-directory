/**
 * Created by Krishan Pal on 01-02-2020.
 */

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './base.component';

import { ApiService } from './services/api.service';
import { FilmsService } from './services/films.service';
import { UserService } from './services/user.service';

import { CommentFormComponent } from './components/films/comment.form.component';
import { FilmDetailComponent } from './components/films/film.detail.component';
import { FilmFormComponent } from './components/films/film.form.component';
import { FilmsComponent } from './components/films/films.component';
import { ProfileComponent } from './components/user/profile.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    // Angular Module
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    // Primeng Module
    ButtonModule,
  ],
  declarations: [
    BaseComponent,
    FilmsComponent,
    FilmDetailComponent,
    FilmFormComponent,
    CommentFormComponent,
    UserComponent,
    ProfileComponent
  ],
  providers: [
    ApiService,
    UserService,
    FilmsService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ BaseComponent ]
})
export class BaseModule {
}
