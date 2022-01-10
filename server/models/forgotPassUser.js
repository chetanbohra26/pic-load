const mongoose = require("mongoose");

const forgotPassUserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const ForgotPassUser = mongoose.model("ForgotPassUser", forgotPassUserSchema);
module.exports.ForgotPassUser = ForgotPassUser;
