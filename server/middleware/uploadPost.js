const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const { PicLoadError } = require("../error/PicLoadError");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		const fileNameLength = file.originalname.length;
		if (fileNameLength < 200) cb(null, uuidv4() + "-" + file.originalname);
		else {
			const extension = file.originalname.split(".").pop();
			const shortName =
				file.originalname.substring(0, 195) + "." + extension;
			cb(null, uuidv4() + "-" + shortName);
		}
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(new PicLoadError("Invalid file type", 400, false));
	}
};

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter,
}).single("postImage");

const uploadAsync = util.promisify(upload);

const uploadUtil = async (req, res) => {
	try {
		await uploadAsync(req, res);
	} catch (err) {
		console.log(typeof err);
		console.log(err);
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				throw new PicLoadError("File too big", 400, false);
			}
			throw new PicLoadError("Invalid file", 400, false);
		}
		throw new PicLoadError(err.message, err.status);
	}
};

module.exports.uploadUtil = uploadUtil;
