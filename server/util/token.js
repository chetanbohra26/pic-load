const jwt = require("jsonwebtoken");

const createToken = (payload) => {
    if (!payload) return;
    const token = jwt.sign(payload, process.env.TOKEN_KEY);
    return token;
};

const verifyToken = (token) => {
    if (!token) return;
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    return payload;
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
