const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const indexRouter = require('./router/index');
const userRouter = require('./router/users');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

//Set up mongoose connection
var mongoDB =
    'mongodb+srv://Yummy:Indeed@cluster0.gvyhh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('MongoDB connection successful.');
    }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//passport setup
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user);
                } else {
                    // passwords do not match!
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        });
    })
);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(3000, () => console.log('app listening on port 3000!'));
