const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.signUp = (req, res, next) => {
    if (req.body.password === req.body.confirmPassword) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (!err) {
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email,
                    groups: [],
                    posts: [],
                }).save((err) => {
                    if (err) {
                        return next(err);
                    }
                    console.log(`User ${req.body.username} created`);
                    res.redirect('/');
                });
            } else {
                return next(err);
            }
        });
    } else {
        //try again
    }
};

exports.logIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});
