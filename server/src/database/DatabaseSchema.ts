import DatabaseService from './DatabaseService';

const database = new DatabaseService();

const createSchema = async () => {
  let sql_user = 'CREATE TABLE IF NOT EXISTS `users` (' +
    '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`username` varchar(255) NOT NULL,' +
    '`password` varchar(255) NOT NULL,' +
    'PRIMARY KEY(`id`)' +
    ') ENGINE = InnoDB DEFAULT CHARSET = utf8';
  
  let sql_films = 'CREATE TABLE IF NOT EXISTS `films` (' +
  '`id` int(11) NOT NULL AUTO_INCREMENT,' +
  '`name` varchar(255) NOT NULL,' +
  '`slug` varchar(255) NOT NULL,' +
  '`description` TEXT,' +
  '`release_date` DATETIME NOT NULL,' +
  '`rating` int(11) NOT NULL,' +
  '`price` DOUBLE,' +
  '`country` varchar(255) NOT NULL,' +
  '`image` TEXT NOT NULL,' +
  'PRIMARY KEY(`id`)' +
  ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

  let sql_genre = 'CREATE TABLE IF NOT EXISTS `genre` (' +
    '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`name` varchar(255) NOT NULL,' +
    'PRIMARY KEY(`id`)' +
    ') ENGINE = InnoDB DEFAULT CHARSET = utf8';
  
  let sql_genre_relation = 'CREATE TABLE IF NOT EXISTS `film_genre_relation` (' +
  '`id` int(11) NOT NULL AUTO_INCREMENT,' +
  '`film_id` int(11) NOT NULL,' +
  '`genre_id` int(11) NOT NULL,' +
  'PRIMARY KEY(`id`)' +
  ') ENGINE = InnoDB DEFAULT CHARSET = utf8';

  let sql_comment = 'CREATE TABLE IF NOT EXISTS `comments` (' +
    '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`username` varchar(255) NOT NULL,' +
    '`user_id` int(11) NOT NULL,' +
    '`text` TEXT NOT NULL,' +
    '`film_id` int(11) NOT NULL,' +
    'PRIMARY KEY(`id`)' +
    ') ENGINE = InnoDB DEFAULT CHARSET = utf8';
  
  let sql_reference_1 = 'ALTER TABLE `comments` ADD CONSTRAINT FK_USER_COMMENT FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)';
  
  let sql_reference_2 = 'ALTER TABLE `comments` ADD CONSTRAINT FK_FILM FOREIGN KEY (`film_id`) REFERENCES `films`(`id`)';
  
  let sql_reference_3 = 'ALTER TABLE `film_genre_relation` ADD CONSTRAINT FK_FILM_RELATION FOREIGN KEY (`film_id`) REFERENCES `films`(`id`)'
  
  let sql_reference_4 = 'ALTER TABLE `film_genre_relation` ADD CONSTRAINT FK_GENRE FOREIGN KEY (`genre_id`) REFERENCES `genre`(`id`)';

  let sql_dump_users = "INSERT INTO `users` VALUES (1,'karanp41@gmail.com','$2a$10$/GV8p14tYAnhZERRWO7m0.IjFaTuS4dj6c54yYFUVsDk8FZyAqqha'),(2,'karanp42@gmail.com','$2a$10$ZqW4fWGgHG0KwM5e6.t4c.D5JLeice26Yn.wTkmHWQQY/yjTY4PQ.');"

  let sql_dump_films = "INSERT INTO `films` VALUES (1,'Inception','inception','Inception movie','2010-01-01 00:00:00',4,30,'India','https://d3tudoxwnizvk7.cloudfront.net/keyart-jpeg/inception_keyart.jpg'),(2,'Interstellar','interstellar','Interstellar is a 2014 epic science fiction film directed, co-written and co-produced by Christopher Nolan.','2010-01-01 00:00:00',5,40,'USA','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRf61mker2o4KH3CbVE7Zw5B1-VogMH8LfZHEaq3UdCMLxARZAB'),(3,'The Dark Knight','the-dark-knight','The Dark Knight is a 2008 superhero film directed, co-produced, and co-written by Christopher Nolan.','2010-01-01 00:00:00',5,20,'UK','https://contentserver.com.au/assets/598411_p173378_p_v8_au.jpg'),(4,'Dunkirk','dunkirk-film','During World War II, soldiers from the British Empire, Belgium and France try to evacuate from the town of Dunkirk during a arduous battle with German forces.','2020-02-08 00:00:00',3,89,'India','https://contentserver.com.au/assets/600828_p13153578_p_v8_ab.jpg')";

  let sql_dump_genre = "INSERT INTO `genre` VALUES (1,'Sci-Fi'),(2,'Horror'),(3,'Thriller'),(4,'Comedy')";

  let sql_dump_comments = "INSERT INTO `comments` VALUES (1,'karanp41@gmail.com',1,'test comment',1),(2,'karanp41@gmail.com',1,'test comment 2',1),(3,'karanp42@gmail.com',2,'Best sci-fi movie of the universe.',2),(4,'karanp42@gmail.com',2,'Best batman movie of the era.',3),(5,'karanp41@gmail.com',1,'Worst movie of Nolan till date.',4)";

  let sql_dump_genre_relation = "INSERT INTO `film_genre_relation` VALUES (1,1,1),(2,1,2),(3,1,3),(4,3,3),(5,3,2)";

  // Creating raw Tables
  await database.query(sql_user, null);
  await database.query(sql_films, null);
  await database.query(sql_genre, null);
  await database.query(sql_genre_relation, null);
  await database.query(sql_comment, null);

  // Adding references and relations to Tables
  await database.query(sql_reference_1, null);
  await database.query(sql_reference_2, null);
  await database.query(sql_reference_3, null);
  await database.query(sql_reference_4, null);

  // Dumping Dummy Data to Tables
  await database.query(sql_dump_users, null);
  await database.query(sql_dump_films, null);
  await database.query(sql_dump_genre, null);
  await database.query(sql_dump_comments, null);
  await database.query(sql_dump_genre_relation, null);
}

export const schema = () => {

  let sql_check_tables = 'SELECT * FROM information_schema.tables WHERE table_schema = \'films_directory\' AND table_name = \'films\' LIMIT 1';

  database.query(sql_check_tables, null).then((result: any) => {
    if (result.length === 0) {
      createSchema();
    }
  });
};
