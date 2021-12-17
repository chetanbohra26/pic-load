const express = require("express");

const { User } = require("../models/user");
const { hashPassword, verifyPassword } = require("../util/hash");
const { createToken } = require("../util/token");
const { loginSchema, registerSchema } = require("./../validations/auth");
const { PicLoadError } = require("../error/PicLoadError");

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const { value, error } = loginSchema.validate(req.body);
		if (error) throw error;

		const user = await User.findOne({ email: value.email });
		if (!user) throw new PicLoadError("Invalid email or password", 401);

		const result = await verifyPassword(user.pass, value.pass);
		if (!result) throw new PicLoadError("Invalid email or password", 401);

		const payload = { id: user._id, name: user.name, email: user.email };
		const token = createToken(payload);
		if (!token) throw new PicLoadError("Could not issue token", 500);

		res.json({ success: true, message: "Login Successful", token });
	} catch (err) {
		res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message || "Error ocurred while login",
		});
	}
});

router.post("/register", async (req, res) => {
	try {
		const { value, error } = registerSchema.validate(req.body);
		if (error) throw error;

		const hash = await hashPassword(value.pass);

		const user = new User({
			name: value.name,
			email: value.email,
			pass: hash,
		});
		await user.save();

		const payload = { id: user._id, name: user.name, email: user.email };
		const token = createToken(payload);
		if (!token) throw new PicLoadError("Could not issue token", 500);

		res.json({ success: true, message: "Successfully Registered", token });
	} catch (err) {
		if (err.code === 11000) {
			res.status(409).json({
				success: false,
				message: "Account with email already exists",
			});
		} else {
			res.status(err.status || 500).json({
				success: err.success || false,
				message: err.message || "Error ocurred while registering user",
			});
		}
	}
});

module.exports = router;
