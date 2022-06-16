var express = require('express');
var router = express.Router();
const userRoutes = require('./users');

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.use('/', userRoutes);

module.exports = router;
