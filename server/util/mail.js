const nodemailer = require("nodemailer");

const sendMail = async (to, subject, body) => {
	console.log("Mail email:", process.env.VERIFY_MAIL_EMAIL);
	console.log("Mail pass:", process.env.VERIFY_MAIL_PASS);
	try {
		const transport = nodemailer.createTransport({
			service: process.env.VERIFY_MAIL_SERVICE,
			auth: {
				user: process.env.VERIFY_MAIL_EMAIL,
				pass: process.env.VERIFY_MAIL_PASS,
			},
		});

		const res = await transport.sendMail({
			from: process.env.VERIFY_MAIL_EMAIL,
			to,
			subject,
			text: body,
		});

		console.log(res);
		return {
			status: "OK",
			res,
		};
	} catch (err) {
		console.error(err);
		return {
			status: "ERROR",
		};
	}
};

module.exports.sendMail = sendMail;
