var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    posts: { type: Array, required: true },
    clubs: { type: Array, required: true },
});

//Export model
module.exports = mongoose.model('User', UserSchema);
