const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { uploadUtil } = require("../middleware/uploadPost");
const { verifyUser } = require("../middleware/verifyUser");
const { Post } = require("../models/post");
const { postSchema } = require("../validations/post");
const { getPosts } = require("../util/post");
const { PicLoadError } = require("../error/PicLoadError");
const { post } = require("../config");

const router = express.Router();

router.get("/fetchPost", async (req, res) => {
	try {
		const category = req.query.category || post.defaultCategory;
		const posts = await getPosts(category);
		if (!posts) {
			throw new PicLoadError("Could not fetch posts", 500);
		}
		res.status(200).json({
			success: true,
			posts,
			total: posts.length,
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			success: err.success || false,
			message: "Could not fetch posts",
		});
	}
});

router.options("*", cors()); //TODO: test if required in PROD
router.post("/createPost", verifyUser, async (req, res) => {
	try {
		await uploadUtil(req, res);

		const file = req.file;
		if (!file) {
			throw new PicLoadError("File not found", 400);
		}

		const data = {
			userId: req.user.id,
			title: req.body.title,
			category: req.body.category,
			postImage: req.file.filename,
		};

		const { error, value } = postSchema.validate(data);
		if (error) {
			req.file &&
				fs.unlink(req.file.path, (err) => {
					if (err) {
						console.error(
							"File deletion failed after invalid Post field(s)",
							err.message
						);
					}
				});
			throw error;
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
			success: err.success || false,
			message: err.message || "An error while creating post",
		});
	}
});

router.get("/postCategories", (req, res) => {
	const categories = (post && post.categories) || [];
	res.json({
		success: true,
		categories,
	});
});

module.exports = router;
