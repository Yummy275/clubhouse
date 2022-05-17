const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const indexRouter = require('./router/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

app.listen(3000, () => console.log('app listening on port 3000!'));
