const argon2 = require("argon2");
const config = require("../config");

async function hashPassword(plainText) {
    try {
        const hash = await argon2.hash(plainText, config.argon2);
        return hash;
    } catch (err) {
        console.log(err.message);
    }
}

async function verifyPassword(hash, plainText) {
    try {
        const result = await argon2.verify(hash, plainText);
        return result;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
