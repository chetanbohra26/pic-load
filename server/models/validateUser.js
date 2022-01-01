const mongoose = require("mongoose");

const validateUserSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
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

const ValidateUser = mongoose.model("ValidateUser", validateUserSchema);

module.exports.ValidateUser = ValidateUser;
