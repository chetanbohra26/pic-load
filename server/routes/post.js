const express = require("express");
const upload = require("../middleware/upload");
const multer = require("multer");
const cors = require("cors");

const router = express.Router();
router.options("*", cors());
router.post("/createPost", (req, res) => {
    console.log("file req receved");
    upload(req, res, (err) => {
        if (err) console.log(err);
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE")
                return res.status(400).json({
                    success: false,
                    error: err.message,
                    code: err.code,
                });
            return res.status(400).json({
                success: false,
                error: "Invalid file",
            });
        } else if (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                err,
            });
        }
        console.log("==========body", req.body);
        res.send({ file: req.file, data: req.body });
    });
});

module.exports = router;
