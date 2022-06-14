var express = require('express');
var router = express.Router();
const clubController = require('../controllers/clubController');

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

module.exports = router;
