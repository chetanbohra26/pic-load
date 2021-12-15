const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const { uploadUtil } = require("../middleware/uploadPost");
const { verifyUser } = require("../middleware/verifyUser");
const { Post } = require("../models/post");
const { postSchema } = require("../validations/post");
const { getPosts } = require("../util/post");

const router = express.Router();
router.options("*", cors());
router.post("/createPost", verifyUser, async (req, res) => {
	console.log("file req receved");

	try {
		await uploadUtil(req, res);

		const file = req.file;
		if (!file) {
			return res.status(400).json({
				success: false,
				message: "File not found",
			});
		}

		const data = {
			userId: req.user.id,
			title: req.body.title,
			postImage: req.file.filename,
		};

		const { error, value } = postSchema.validate(data);
		if (error) {
			req.file &&
				fs.unlink(req.file.path, (err) => {
					if (err) throw err;
					console.log("file deleted", req.file.path);
				});
			console.log();
			return res.status(400).json({
				success: false,
				message: error.details[0].message,
			});
		}

		const post = new Post({
			...value,
			postImage: req.file.filename,
		});

		await post.save();

		return res.status(201).json({
			success: true,
			message: "File uploaded successfully",
		});
	} catch (err) {
		res.status(err.status || 500).json({
			success: false,
			message: err.message,
		});
	}
});

router.get("/fetchPost", async (req, res) => {
	const posts = await getPosts();
	if (!posts) {
		return res.status(500).json({
			success: false,
			message: "Could not fetch posts",
		});
	}
	res.status(200).json({
		success: true,
		posts,
		total: posts.length,
	});
});

module.exports = router;
