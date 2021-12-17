const Joi = require("joi");

const { PicLoadError } = require("../error/PicLoadError");

const loginSchema = Joi.object({
	email: Joi.string()
		.email()
		.max(256)
		.required()
		.error(() => new PicLoadError("Provide a valid email", 400)),
	pass: Joi.string()
		.required()
		.error(() => new PicLoadError("Provide a valid password", 400)),
});

const registerSchema = Joi.object({
	name: Joi.string()
		.required()
		.trim()
		.error(() => new PicLoadError("Provide a valid name", 400)),
	email: Joi.string()
		.email()
		.max(256)
		.required()
		.trim()
		.error(() => new PicLoadError("Provide a valid email", 400)),
	pass: Joi.string()
		.min(6)
		.required()
		.error(
			() => new PicLoadError("Password must be of atleast 6 length", 400)
		),
	pass2: Joi.string()
		.min(6)
		.required()
		.equal(Joi.ref("pass"))
		.error(() => new PicLoadError("Passwords are not same", 400)),
});

module.exports.loginSchema = loginSchema;
module.exports.registerSchema = registerSchema;
