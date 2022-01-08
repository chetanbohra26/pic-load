const argon2 = require("argon2");

const config = {
	argon2: {
		type: argon2.argon2id,
	},
	post: {
		categories: [
			{ key: "general", name: "General", order: 1 },
			{ key: "anime", name: "Anime", order: 2 },
			{ key: "wildlife", name: "Wild life", order: 3 },
			{ key: "dankmemes", name: "Dank Memes", order: 4 },
		],
	},
};

module.exports = config;
