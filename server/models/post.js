const mongoose = require("mongoose");
const { post } = require("../config");

const postSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
		default: post.defaultCategory,
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
});

const Post = mongoose.model("Post", postSchema);
module.exports.Post = Post;
