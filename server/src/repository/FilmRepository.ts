import DatabaseService from '../database/DatabaseService';
import { Film } from '../model/Film';
import { Comment } from '../model/Comment';
import { BaseRepository } from './BaseRepository';

const database = new DatabaseService();

export default class FilmRepository implements BaseRepository<Film> {
  findAll(callback: any): void {
    database.query('SELECT * FROM films', null).then(
      (results: Film[]) => callback(results)
    );
  }
  
  findOneById(id: number, callback: any): void {
    database.query('SELECT * FROM films WHERE id = ?', [ id ]).then((filmResult: Film) => {
      let film: any = [];
      let comments: any = [];
      
      database.query('SELECT * FROM comments WHERE film_id = ?', [ id ]).then((commentResult: Comment[]) => {
        film = filmResult[ 0 ];
        comments = commentResult;
        
        callback({film, comments});
      });
    });
  }
  
  async findOneBySlug(id: number, callback: any) {
    
    let film: any = [];
    let comments: any = [];
    let genre: any = [];
    
    film = await new Promise((resolve) => database.query('SELECT * FROM films WHERE slug = ?', [ id ]).then((filmResult: Film) => {
      resolve(filmResult[0]);
    }));

    comments = await new Promise((resolve) => database.query('SELECT * FROM comments WHERE film_id = ?', [ film.id ]).then((commentResult: Comment[]) => {
      resolve(commentResult);
    }));

    genre = await new Promise((resolve) => database.query('SELECT genre.name  FROM film_genre_relation LEFT JOIN genre ON film_genre_relation.genre_id = genre.id WHERE film_id = ?', [ film.id ]).then((genreResult: Comment[]) => {
      resolve(genreResult);
    }));

    callback({film, comments, genre});
  }

  async createOne(film: Film, callback: any) {
    const { genre, ...flimData } = film;

    const film_id = await new Promise((resolve) =>  database.query('INSERT INTO films SET ?', flimData).then(
      (result: any) => resolve(result.insertId)
    ));

    const genreToAdd = genre.map((s: string) => { return { film_id, genre_id: s }});

    database.query('INSERT INTO film_genre_relation SET ?', genreToAdd).then(() => callback({film_id}));
  }
  
  updateOne(film: Film): void {
    database.query('UPDATE films SET ? WHERE id = ?', [ film, film.id ]);
  }
  
  deleteOne(id: number): void {
    database.query('DELETE FROM films WHERE id = ?', [ id ]);
  }
}
