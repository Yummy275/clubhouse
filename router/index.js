var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/log-in', (req, res) => {
    res.render('log-in');
});
router.post('/log-in', userController.logIn);

router.get('/log-out', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});
router.post('/sign-up', userController.signUp);

module.exports = router;
