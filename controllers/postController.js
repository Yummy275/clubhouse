const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.createPost = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 24 })
        .withMessage('Title must be between 3-24 characters')
        .escape(),
    body('content')
        .trim()
        .isLength({ max: 200 })
        .withMessage('Post content must be less than 200 characters.')
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // did not pass validation
            req.postError = errors.array();
            next();
        } else {
            const creationDate = new Date();
            const formattedDate = creationDate.toDateString();

            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                author: req.user.username,
                date: formattedDate,
            }).save((err) => {
                if (err) {
                    return next(err);
                } else {
                    console.log(
                        `${req.user.username} posted ${req.body.title}, ${formattedDate}`
                    );
                    next();
                }
            });
        }
    },
];

exports.deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.postId, (err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};

exports.getPosts = (req, res, next) => {
    Post.find()
        .sort([['_id', -1]])
        .exec((err, listPosts) => {
            if (err) {
                return next(err);
            } else {
                req.listPosts = listPosts;
                next();
            }
        });
};
