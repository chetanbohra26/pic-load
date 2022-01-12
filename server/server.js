const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbInit } = require("./db");
const apiRouter = require("./routes/api");

const app = express();

const environment = app.settings.env;
console.log("Environment:", environment);

//configuring dev environment
if (environment === "development") {
	require("dotenv").config(); //load environment variables from .env file
	app.use(cors()); //allowing cross origin requests for dev
}

dbInit();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./../uploads")));

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "./../build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}..!`);
});
