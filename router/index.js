var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find()
        .sort([['_id', -1]])
        .exec((err, listPosts) => {
            if (err) {
                return next(err);
            } else {
                res.render('index', { user: req.user, posts: listPosts });
            }
        });
});

router.post('/', postController.createPost);

module.exports = router;
