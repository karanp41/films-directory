/**
 * Created by Krishan Pal on 03-02-2020.
 */

import * as express from 'express';
import * as authentication from '../Authentication';
import CommentRepository from '../repository/CommentRepository';

const router = express.Router();
const commentRepository = new CommentRepository();

// create a new comment by film id
router.post('/comment', authentication.isLoggedIn, (req: any, res: any) => {
  req.body.text = req.sanitize(req.body.text);
  
  try {
    commentRepository.createOne(req.body, (callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err});
  }
});

export = router;
