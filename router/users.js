var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/log-in', (req, res) => {
    if (req.query.error) {
        res.render('log-in', { errorMsg: 'enabled' });
    } else {
        res.render('log-in');
    }
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
