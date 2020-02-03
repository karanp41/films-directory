import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/comment';
import { FilmsService } from '../../services/films.service';
import { UserService } from '../../services/user.service';

/**
 * Created by Krishan Pal on 03-02-2020.
 */

@Component({
  selector: 'app-comment',
  templateUrl: './app/components/films/comment.form.component.html',
  styleUrls: [ './app/components/films/films.component.css' ]
})

export class CommentFormComponent implements OnInit {
  @ViewChild('f') commentForm: NgForm;
  @Input() comment: Comment;
  @Input() film_id: number = 0;
  @Output() insertedComment = new EventEmitter<Comment>();
  
  userdata: any;
  
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
    
    if (!this.comment) {
      this.comment = new Comment();
    }
  }
  
  doSubmit() {
    this.comment.user_id = this.userdata.id;
    this.comment.username = this.userdata.username;
    this.comment.film_id = this.film_id;
    
    if (this.comment.text) {
      if (!this.comment.id) {
        this.filmService.createComment(this.comment)
          .subscribe(data => this.router.navigate([ '/films' ]));
      } else {
        this.filmService.editComment(this.comment)
          .subscribe(data => console.log(data));
      }
    }
    this.commentForm.reset();
  }
}
