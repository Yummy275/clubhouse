const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.signUp = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage('Username must be between 3-12 characters.')
        .isAlphanumeric()
        .withMessage('Username can only contain number and letters.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password fields do not match.');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('sign-up', { errors: errors.array() });
        } else {
            const adminStatus = (function () {
                if (req.body.admin) {
                    return true;
                } else {
                    return false;
                }
            })();

            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (!err) {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        admin: adminStatus,
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
        }
    },
];

exports.logIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});
