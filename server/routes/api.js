const express = require("express");
const authRouter = require("./auth");
const postRouter = require("./post");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);

router.get("/", (req, res) => {
    res.send({ msg: "Welcome to api" });
});

module.exports = router;
