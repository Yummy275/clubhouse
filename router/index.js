var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/log-out', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/sign-up', (req, res) => {
    res.render('signUp');
});
router.post('/sign-up', userController.signUp);

module.exports = router;
