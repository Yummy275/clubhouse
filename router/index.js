var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

router.post('/delete-post/:postId', postController.deletePost);

module.exports = router;
