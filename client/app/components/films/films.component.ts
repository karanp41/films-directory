/**
 * Created by Krishan Pal on 01-02-2020.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Film } from '../../models/film';
import { FilmsService } from '../../services/films.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'films',
  templateUrl: './app/components/films/films.component.html',
  styleUrls: [ './app/components/films/films.component.css' ]
})

export class FilmsComponent implements OnInit {
  films: Film[];
  userdata: any;
  
  constructor(private router: Router, private filmService: FilmsService, private userService: UserService) {
  }
  
  ngOnInit() {
    this.getFilms();
    this.userdata = this.userService.getUserData();
  }
  
  getFilms() {
    this.filmService.getFilms().subscribe(films => this.films = films);
  }
  
  moreInfo(slug: string) {
    this.router.navigateByUrl('/film/detail/' + slug);
  }
  
  addNewFilm() {
    this.router.navigateByUrl('/film/new');
  }
}
