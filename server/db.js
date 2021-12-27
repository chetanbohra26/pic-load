const mongoose = require("mongoose");

const dbInit = () => {
	mongoose.connect(process.env.MONGODB_URL, (err) => {
		if (err) throw err;
		console.log("Connected to mongodb");
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Disconnected from mongodb");
	});

	process.on("SIGINT", () => {
		mongoose.disconnect(() => {
			console.log("mongodb disconnected before app termination");
			process.exit(0);
		});
	});
};

module.exports.dbInit = dbInit;
