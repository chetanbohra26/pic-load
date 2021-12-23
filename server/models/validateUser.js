const mongoose = require("mongoose");

const validateUserSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	secret: {
		type: String,
		required: true,
	},
});

const ValidateUser = mongoose.model("ValidateUser", validateUserSchema);

module.exports.ValidateUser = ValidateUser;
