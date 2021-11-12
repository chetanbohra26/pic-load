const express = require("express");
const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
    res.send({ msg: "Welcome to api" });
});

module.exports = router;
