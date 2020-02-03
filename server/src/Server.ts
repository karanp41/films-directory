/**
 * Created by Krishan Pal on 01-02-2020.
 */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import * as path from 'path';

import * as filmRoutes from './routes/Film';
import * as commentRoutes from './routes/Comment';
import * as userRoutes from './routes/User';

const expressSanitizer = require('express-sanitizer');

// initial database schema
require('./database/DatabaseSchema').schema();
require('./Passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(expressSanitizer());

app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// initial routes
app.use('/api', userRoutes);
app.use('/api', filmRoutes);
app.use('/api', commentRoutes);

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('*', (req: any, res: any) => {
  res.send('Sorry, page not found!');
});

export = app;
