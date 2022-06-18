const Post = require('../models/post');

exports.createPost = (req, res, next) => {
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
            res.redirect('/');
        }
    });
};

exports.deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.postId, (err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
