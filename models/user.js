var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

//Export model
module.exports = mongoose.model('User', UserSchema);
