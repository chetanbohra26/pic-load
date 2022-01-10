const express = require("express");

const { User } = require("../models/user");
const { ForgotPassUser } = require("../models/forgotPassUser");
const { hashPassword, verifyPassword } = require("../util/hash");
const {
	createToken,
	createPassToken,
	verifyPassToken,
} = require("../util/token");
const { sendOtp } = require("../util/otp");
const {
	loginSchema,
	registerSchema,
	createPassOTPSchema,
	verifyPassOTPSchema,
	updateForgotPassSchema,
} = require("./../validations/auth");
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

		const payload = {
			id: user._id,
			name: user.name,
			email: user.email,
			isVerified: user.isVerified,
		};
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

		const payload = {
			id: user._id,
			name: user.name,
			email: user.email,
			isVerified: user.isVerified,
		};
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

router.post("/createPasswordOTP", async (req, res) => {
	try {
		const { value, error } = createPassOTPSchema.validate(req.body);
		if (error) throw error;

		const email = value.email;
		const user = await User.findOne({ email }, { email: 1 });
		if (!user)
			return res.json({
				success: true,
				message: "If email was registered, OTP has been sent",
				devServerMsg: "NO-USER",
			});

		const otp = await sendOtp(email);

		let record = await ForgotPassUser.findOne({ email });
		if (!record) {
			record = new ForgotPassUser({ email, otp });
		} else {
			(record.otp = otp), (record.timestamp = new Date());
		}
		await record.save();

		res.json({
			success: true,
			message: "If email was registered, OTP has been sent",
		});
	} catch (err) {
		res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message || "Error ocurred while registering user",
		});
	}
});

router.post("/verifyPasswordOTP", async (req, res) => {
	try {
		const { error, value } = verifyPassOTPSchema.validate(req.body);
		if (error) throw error;

		const email = value.email;

		const record = await ForgotPassUser.findOne({ email });
		if (!record) throw new PicLoadError("Invalid OTP", 401);

		const otpMatch = record.otp === value.otp;
		if (!otpMatch) throw new PicLoadError("Invalid OTP", 401);

		const hash = await hashPassword(value.newPass);
		if (!hash) throw new PicLoadError("Could not update password", 500);

		const user = await User.findOne({ email });
		if (!user) throw new PicLoadError("User not found", 404);
		user.pass = hash;

		await user.save();
		await record.remove();

		res.json({
			success: true,
			message: "Password updated successfully",
		});
	} catch (err) {
		console.error({ ...err });
		res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message || "Could not verify OTP",
		});
	}
});

module.exports = router;
