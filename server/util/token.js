const jwt = require("jsonwebtoken");

const createToken = (payload) => {
	try {
		if (!payload) return;
		const token = jwt.sign(payload, process.env.TOKEN_KEY);
		return token;
	} catch (err) {
		console.error("Error when creating token");
	}
};

const verifyToken = (token) => {
	try {
		if (!token) return;
		const payload = jwt.verify(token, process.env.TOKEN_KEY);
		return payload;
	} catch (err) {
		console.error("Invalid token received");
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
