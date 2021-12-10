const { verifyToken } = require("../util/token");

const verifyUser = (req, res, next) => {
	const token = req.headers.token;
	if (!token)
		return res.status(401).json({
			success: false,
			message: "Token missing from request header",
		});
	const user = verifyToken(token);
	if (!user) {
		return res.status(401).json({
			success: false,
			message: "Invalid token",
		});
	}
	req.user = user;
	next();
};

module.exports.verifyUser = verifyUser;
