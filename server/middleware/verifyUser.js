const { verifyToken } = require("../util/token");
const { PicLoadError } = require("../error/PicLoadError");

const verifyUser = (req, res, next) => {
	try {
		const token = req.headers.token;
		if (!token)
			throw new PicLoadError("Token missing from request header", 400);

		const user = verifyToken(token);
		if (!user) throw new PicLoadError("Invalid token", 401);

		req.user = user;
		next();
	} catch (err) {
		return res.status(err.status || 500).json({
			success: err.success || false,
			message: err.message,
		});
	}
};

module.exports.verifyUser = verifyUser;
