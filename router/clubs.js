var express = require('express');
var router = express.Router();
const clubController = require('../controllers/clubController');
const postController = require('../controllers/postController');

router.get('/', (req, res) => {
    res.render('clubs');
});

router.get('/new-club', (req, res) => {
    res.render('new-club-form');
});
router.post('/new-club', clubController.createClub);

router.get('/:clubTitle', (req, res) => {
    res.render('club-page', { clubTitle: req.params.clubTitle });
});

router.get('/:clubTitle/new-post', (req, res) => {
    res.render('new-post-form');
});

router.post('/:clubTitle/new-post', postController.createPost);

module.exports = router;
