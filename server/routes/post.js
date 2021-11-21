const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/createPost", (req, res) => {
    upload(req, res, (err) => {
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
        res.send(req.file);
    });
});

module.exports = router;
