/**
 * Created by Krishan Pal on 01-02-2020.
 */

import * as express from 'express';
import * as authentication from '../Authentication';
import FilmRepository from '../repository/FilmRepository';

const router = express.Router();
const filmRepository = new FilmRepository();

// get all films
router.get('/film', (req: any, res: any) => {
  try {
    filmRepository.findAll((callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err});
  }
});

// create one film
router.post('/film', authentication.isLoggedIn, (req: any, res: any) => {
  req.body.name = req.sanitize(req.body.name);
  req.body.image = req.sanitize(req.body.image);
  req.body.description = req.sanitize(req.body.description);
  req.body.price = req.sanitize(req.body.price);
  
  try {
    filmRepository.createOne(req.body, (callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err});
  }
});

router.get('/film/:slug', (req: any, res: any) => {
  try {
    filmRepository.findOneBySlug(req.params.slug, (callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err});
  }
});

export = router;
