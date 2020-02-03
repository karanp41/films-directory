/**
 * Created by Krishan Pal on 01-02-2020.
 */

import FilmRepository from './repository/FilmRepository';
import CommentRepository from './repository/CommentRepository';

const filmRepository = new FilmRepository();
const commentRepository = new CommentRepository();

const authentication: any = {};

authentication.checkFilmOwner = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    try {
      filmRepository.findOneById(req.params.id, (callback: any) => {
        if (callback.film.user_id !== req.user.id) {
          res.status(403).send({message: 'You have no permission'});
        } else {
          next();
        }
      });
    } catch (err) {
      res.status(500).send({message: err});
    }
  } else {
    res.status(403).send({message: 'Please Login First'});
  }
};

authentication.checkCommentOwner = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    try {
      commentRepository.findOneById(req.params.comment_id, (callback: any) => {
        if (callback.comment.user_id !== req.user.id) {
          res.status(403).send({message: 'You have no permission'});
        } else {
          next();
        }
      });
    } catch (err) {
      res.status(500).send({message: err});
    }
  } else {
    res.status(403).send({message: 'Please Login First'});
  }
};

authentication.isLoggedIn = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send({message: 'Please Login First'});
};

export = authentication;
