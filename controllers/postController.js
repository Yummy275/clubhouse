const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const id = uuidv4();
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.username,
    }).save((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};
