/**
 * Created by Krishan Pal on 01-02-2020.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import * as _ from 'lodash';
import { Comment } from '../../models/comment';
import { FilmDetail } from '../../models/filmDetail';
import { FilmsService } from '../../services/films.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'filmDetail',
  templateUrl: './app/components/films/film.detail.component.html',
  styleUrls: [ './app/components/films/films.component.css' ]
})

export class FilmDetailComponent implements OnInit {
  selectedComment: Comment;
  
  filmDetail: FilmDetail = new FilmDetail();
  userdata: any;
  
  constructor(private filmService: FilmsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.filmService.getFilmDetail(params.slug))
      .subscribe(data => this.filmDetail = data);
    this.userdata = this.userService.getUserData();
  }
  
  doLogin() {
    this.router.navigateByUrl('/login');
  }
  
  updateUI(comment: Comment) {
    this.filmDetail.comments.push(comment);
  }
}
