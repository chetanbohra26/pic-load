const { Post } = require("../models/post");

const getPosts = async () => {
	try {
		const posts = await Post.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$project: {
					title: 1,
					postImage: 1,
					createdAt: 1,
					author: { $first: "$user.name" },
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		]);
		return posts;
	} catch (err) {
		console.log(err.message);
		throw err;
	}
};

module.exports.getPosts = getPosts;
