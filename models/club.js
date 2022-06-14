var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClubSchema = new Schema({
    title: { type: String, required: true },
    members: { type: Array, required: true },
    posts: { type: Array, required: true },
});

module.exports = mongoose.model('Club', ClubSchema);
