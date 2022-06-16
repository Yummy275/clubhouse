const Post = require('../models/post');
const { v4: uuidv4 } = require('uuid');

exports.createPost = (req, res, next) => {
    const id = uuidv4();
    console.log(req.user);
    const post = new Post({
        id: id,
        title: req.body.title,
        content: req.body.content,
        author: req.user.username,
        club: req.params.clubTitle,
    }).save((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};
