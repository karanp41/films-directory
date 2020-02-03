/**
 * Created by Krishan on 03/02/20.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/film';
import { FilmsService } from '../../services/films.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'filmForm',
  templateUrl: './app/components/films/film.form.component.html',
  styleUrls: [ './app/components/films/films.component.css' ]
})

export class FilmFormComponent implements OnInit {
  userdata: any;
  film: Film = new Film();
  
  constructor(private filmService: FilmsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  
  ngOnInit() {
    this.userdata = this.userService.getUserData();
    
    if (!this.userdata) {
      this.router.navigate([ '/login' ]);
    }

  }
  
  doSubmit() {
    this.filmService.createFilm(this.film)
      .subscribe(data => {
        if (data.message === 'OK') {
          this.router.navigate([ '/films' ]);
        }
      });
  }
}
