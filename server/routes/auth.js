const express = require("express");

const { User } = require("../model/user");
const { hashPassword, verifyPassword } = require("../util/hash");
const { createToken } = require("../util/token");

const router = express.Router();
const { loginSchema, registerSchema } = require("./../validations/auth");

router.post("/login", async (req, res) => {
	const { value, error } = loginSchema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ success: false, message: error.details[0].message, value });
	}

	try {
		const user = await User.findOne({ email: value.email });

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}

		const result = await verifyPassword(user.pass, value.pass);

		if (!result) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}

		const payload = { id: user._id, name: user.name, email: user.email };

		const token = createToken(payload);

		res.json({ success: true, message: "Login Successful", token });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			success: false,
		});
	}
});

router.post("/register", async (req, res) => {
	const { value, error } = registerSchema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ success: false, message: error.details[0].message });
	}

	try {
		const hash = await hashPassword(value.pass);

		const user = new User({
			name: value.name,
			email: value.email,
			pass: hash,
		});

		await user.save();

		const payload = { id: user._id, name: user.name, email: user.email };

		const token = createToken(payload);

		res.json({ success: true, message: "Successfully Registered", token });
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			res.status(409).json({
				success: false,
				message: "Account with email already exists",
			});
		} else {
			res.status(500).json({
				success: false,
			});
		}
	}
});

module.exports = router;
