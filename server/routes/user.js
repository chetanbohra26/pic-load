const express = require("express");
const { PicLoadError } = require("../error/PicLoadError");
const { verifyUser } = require("../middleware/verifyUser");
const { sendOtp } = require("../util/otp");
const { ValidateUser } = require("../models/validateUser");
const { User } = require("../models/user");
const { createToken } = require("../util/token");

const router = express.Router();

router.get("/createOTP", verifyUser, async (req, res) => {
	try {
		const email = req.user && req.user.email;
		const userId = req.user && req.user.id;
		if (!email)
			throw new PicLoadError("Could not validate user details", 401);

		const otp = await sendOtp(email);
		if (!otp) throw new PicLoadError("Could not generate OTP", 500);

		let record = await ValidateUser.findOne({ userId });
		if (!record) {
			record = new ValidateUser({
				userId,
				otp,
			});
		} else {
			record.otp = otp;
			record.timestamp = new Date();
		}
		await record.save();

		res.json({
			success: true,
			message: "Check mail for OTP",
		});
	} catch (err) {
		res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message || "Error ocurred while sending OTP",
		});
	}
});

router.post("/verifyOTP", verifyUser, async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		if (!userId)
			throw new PicLoadError("Could not validate user details", 401);
		const otp = req.body.otp;
		if (!otp) throw new PicLoadError("Missing OTP", 400);

		const record = await ValidateUser.findOne({ userId });
		if (!record || record.otp !== otp) {
			throw new PicLoadError("Incorrect OTP", 401);
		}

		const user = await User.findById(userId);
		if (!user) throw new PicLoadError("User no longer exists", 404);

		user.isVerified = true;
		await user.save();
		await record.remove();

		const payload = {
			id: user._id,
			name: user.name,
			email: user.email,
			isVerified: user.isVerified,
		};

		const token = createToken(payload);

		res.json({
			success: true,
			message: "OTP Verified Successfully",
			token,
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
