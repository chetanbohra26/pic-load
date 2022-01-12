const Joi = require("joi");
const { PicLoadError } = require("../error/PicLoadError");

const postSchema = Joi.object({
	userId: Joi.string()
		.required()
		.trim()
		.error(() => new PicLoadError("Could not identify user", 500)),
	title: Joi.string()
		.required()
		.trim()
		.error(() => new PicLoadError("Title is missing", 400)),
	category: Joi.string()
		.required()
		.trim()
		.error(() => new PicLoadError("Category is missing", 400)),
	postImage: Joi.string()
		.required()
		.trim()
		.error(() => new PicLoadError("Could not process image", 500)),
});

module.exports.postSchema = postSchema;
