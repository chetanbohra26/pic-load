const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	postImage: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	title: {
		type: String,
		required: true,
	},
});

const Post = mongoose.model("Post", postSchema);
module.exports.Post = Post;
