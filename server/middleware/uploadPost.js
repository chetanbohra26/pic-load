const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const { postSchema } = require("../validations/post");

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
				file.originalname.substr(0, 196) + "." + extension;
			cb(null, uuidv4() + "-" + shortName);
		}
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

const uploadAsync = util.promisify(upload);

class FileUploadError extends Error {
	constructor(
		message = "Unknown file upload error",
		status = 400,
		success = false
	) {
		super();
		this.message = message;
		this.status = status;
		this.success = success;
	}
}

const uploadUtil = async (req, res) => {
	try {
		await uploadAsync(req, res);
	} catch (err) {
		console.log(typeof err);
		console.log(err);
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				throw new FileUploadError("File too big", 400, false);
			}
			throw new FileUploadError("Invalid file", 400, false);
		}
		throw new FileUploadError(err.message, err.status);
	}
};

module.exports.uploadUtil = uploadUtil;
