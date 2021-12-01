const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + "_" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(new Error("Invalid file type"));
	}
};

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter,
}).single("postImage");

module.exports = upload;