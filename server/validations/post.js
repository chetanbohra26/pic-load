const Joi = require("joi");

const postSchema = Joi.object({
	userId: Joi.string().required().trim(),
	title: Joi.string().required().trim(),
	postImage: Joi.string().required().trim(),
});

module.exports.postSchema = postSchema;
