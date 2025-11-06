const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
text: { type: String, required: true },
postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', CommentSchema);
