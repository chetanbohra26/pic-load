const express = require("express");
const { PicLoadError } = require("../error/PicLoadError");
const { verifyUser } = require("../middleware/verifyUser");
const { sendOtp } = require("../util/mail");
const { ValidateUser } = require("../models/validateUser");

const router = express.Router();

router.get("/createOTP", verifyUser, async (req, res) => {
	try {
		const email = req.user && req.user.email;
		const userId = req.user && req.user.id;
		if (!email)
			throw new PicLoadError("Email is missing from ", 500, false);

		const otp = await sendOtp(email);
		if (!otp) throw new PicLoadError("Could not generate OTP", 500, false);

		let record = await ValidateUser.findOne({ userId });
		if (!record) {
			record = new ValidateUser({
				userId,
				otp,
			});
		} else {
			record["otp"] = otp;
			record["timestamp"] = new Date();
		}
		await record.save();

		res.json({
			sucess: true,
			message: "Check mail for OTP",
		});
	} catch (err) {
		res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message || "Error ocurred while sending OTP",
		});
	}
});

module.exports = router;
