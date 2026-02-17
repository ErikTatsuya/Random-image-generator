const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

const { Caller } = require("./Caller.js");
const fs = require("fs").promises;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/getAllFiles", async (req, res) => {
	async function listFiles(dirPath) {
		return await fs.readdir(dirPath);
	}

	const images = (await listFiles("./images/")).sort();

	sizeMB = await Caller.BytesSize("MB");
	sizeBytes = await Caller.BytesSize("Bytes");

	res.status(200).json({
		total: images.length,
		total_png: images.filter((file) => file.endsWith(".png")).length,
		total_jpg: images.filter((file) => file.endsWith(".jpg")).length,
		size_bytes: sizeBytes,
		size_MB: sizeMB,
		files: images,
	});
});

app.use("/myFiles/", express.static("./images/"));

app.get("/generateImages/:x/:y/:quantity/:extension", async (req, res) => {
	const { x, y, quantity, extension } = req.params;
	await Caller.ImageGenerator(x, y, quantity, extension);
	res.status(200).json({ message: "finished" });
});

app.listen(port, () => {
	console.log(`running on port ${port}`);
	console.log(`http://localhost:${port}`);
});

module.exports = Caller;
