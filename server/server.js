const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const apiRouter = require("./routes/api");

const app = express();

const environment = app.settings.env;
console.log("Environment:", environment);

//configuring dev environment
if (environment === "development") {
	require("dotenv").config(); //load environment variables from .env file
	app.use(cors()); //allowing cross origin requests for dev
}

mongoose.connect(process.env.MONGODB_URL, (err) => {
	if (err) throw err;
	console.log("Connected to mongodb");
});

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./../uploads")));

app.get("/", (req, res) => {
	res.status(200).json({ success: true, msg: "Welcome to pic-load api" });
});

app.use("/api", apiRouter);

const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}..!`);
});
