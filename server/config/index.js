const argon2 = require("argon2");

const config = {
	argon2: {
		type: argon2.argon2id,
	},
	post: {
		categories: [
			{ id: "general", name: "General", order: 1 },
			{ id: "anime", name: "Anime", order: 2 },
			{ id: "wildlife", name: "Wildlife", order: 3 },
			{ id: "dankmemes", name: "Dank Memes", order: 4 },
			{
				id: "photo",
				name: "Travel & Photography",
				order: 5,
			},
		],
		defaultCategory: "general",
	},
};

module.exports = config;
