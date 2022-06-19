var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

const renderHome = (req, res) => {
    res.render('index', {
        user: req.user,
        posts: req.listPosts,
        postError: req.postError,
    });
};

router.get('/', postController.getPosts, renderHome);

router.post(
    '/new-post',
    postController.createPost,
    postController.getPosts,
    renderHome
);

router.post('/delete-post/:postId', postController.deletePost);

module.exports = router;
