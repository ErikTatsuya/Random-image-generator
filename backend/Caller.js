const { spawn } = require("child_process");

class Caller {
	static ImageGenerator(x, y, quantity, extension) {
		return new Promise((resolve, reject) => {
			const child = spawn("python", [
				"imageGenerator.py",
				x,
				y,
				quantity,
				extension,
			]);

			let errorOutput = "";

			child.stderr.on("data", (data) => {
				errorOutput += data.toString();
			});

			child.on("error", (err) => {
				reject(err);
			});

			child.on("close", (code) => {
				if (code === 0) {
					resolve("Images generated");
				} else {
					reject(errorOutput || `Exited with code ${code}`);
				}
			});
		});
	}

	static BytesSize(option) {
		return new Promise((resolve, reject) => {
			const child = spawn("python", ["sizeCalculator.py", option]);

			let output = "";

			child.stdout.on("data", (data) => {
				output += data.toString();
			});

			child.stderr.on("data", (data) => {
				reject(data.toString());
			});

			child.on("close", (code) => {
				if (code === 0) {
					resolve(output.trim());
				} else {
					reject(`Exited with code ${code}`);
				}
			});
		});
	}
}

module.exports = { Caller };
