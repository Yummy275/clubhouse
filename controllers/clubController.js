const Club = require('../models/club');

exports.createClub = (req, res, err) => {
    const club = new Club({
        title: req.body.title,
        members: [],
        posts: [],
    }).save((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};
