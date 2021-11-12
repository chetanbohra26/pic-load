const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().min(3).max(256).required(),
    pass: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().min(3).max(256).required().trim(),
    pass: Joi.string().min(6).required(),
    pass2: Joi.string().min(6).required().equal(Joi.ref("pass")),
});

module.exports.loginSchema = loginSchema;
module.exports.registerSchema = registerSchema;
