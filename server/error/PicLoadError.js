class PicLoadError extends Error {
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

module.exports.PicLoadError = PicLoadError;
