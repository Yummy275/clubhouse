var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.post('/', postController.createPost);

module.exports = router;
