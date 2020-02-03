/**
 * Created by Krishan Pal on 01-02-2020.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Comment } from '../models/comment';
import { Film } from '../models/film';
import { FilmDetail } from '../models/filmDetail';
import { ApiService } from './api.service';

@Injectable()
export class FilmsService {
  
  private filmsUrl = 'api/film';  // URL to web api
  private commentUrl = 'api/comment/';
  
  constructor(private apiService: ApiService) {
  }
  
  getFilms(): Observable<Film[]> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.filmsUrl, _bodyData, _params, _formParams);
  }
  
  getFilmDetail(slug: string): Observable<FilmDetail> {
    const _params: any = {};
    const _formParams: any = {};
    const _bodyData: any = {};
    
    return this.apiService.perform('get', this.filmsUrl + '/' + slug, _bodyData, _params, _formParams);
  }
  
  createFilm(film: Film): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    
    return this.apiService.perform('post', this.filmsUrl, film, _params, _formParams);
  }
  
  editComment(comment: Comment): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    const url = this.commentUrl + comment.id + '/edit';
    
    return this.apiService.perform('put', url, comment, _params, _formParams);
  }
  
  createComment(comment: Comment): Observable<any> {
    const _params: any = {};
    const _formParams: any = {};
    
    return this.apiService.perform('post', this.commentUrl, comment, _params, _formParams);
  }
}
