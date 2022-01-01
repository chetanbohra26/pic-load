const { sendMail } = require("./mail");

const sendOtp = async (to) => {
	const otp = Math.floor(100000 + Math.random() * 900000);
	const { status } = await sendMail(
		to,
		"PicLoad - Confirm user email",
		"OTP: " + otp
	);

	if (status && status === "OK") return otp;
};

module.exports.sendOtp = sendOtp;
