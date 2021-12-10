const jwt = require("jsonwebtoken");

const createToken = (payload) => {
	if (!payload) return;
	try {
		const token = jwt.sign(payload, process.env.TOKEN_KEY);
		return token;
	} catch (err) {
		console.error("Error when creating token");
	}
};

const verifyToken = (token) => {
	if (!token) return;
	try {
		const payload = jwt.verify(token, process.env.TOKEN_KEY);
		return payload;
	} catch (err) {
		console.error("Invalid token received");
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
