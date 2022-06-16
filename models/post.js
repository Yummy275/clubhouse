var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    club: { type: String, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
