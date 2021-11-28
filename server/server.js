const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, (err) => {
	if (err) throw err;
	console.log("Connected to mongodb");
});

const apiRouter = require("./routes/api");

const app = express();

//use cors for dev only
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./../uploads")));

app.get("/", (req, res) => {
	res.send({ msg: "Welcome to express" });
});

app.use("/api", apiRouter);

const PORT = process.env.PORT || 7500;
app.listen(PORT, () => console.log(`Listening on port ${PORT}..!`));
