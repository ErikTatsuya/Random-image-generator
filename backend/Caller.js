const { spawn } = require("child_process");

class Caller {
    static ImageGenerator(x, y, quantity, extension) {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn("python", [
                "imageGenerator.py",
                x,
                y,
                quantity,
                extension,
            ]);

            let errorOutput = "";

            pythonProcess.stderr.on("data", (data) => {
                errorOutput += data.toString();
            });

            pythonProcess.on("error", (err) => {
                reject(err);
            });

            pythonProcess.on("close", (code) => {
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
            const pythonProcess = spawn("python", [
                "sizeCalculator.py",
                option,
            ]);

            let output = "";

            pythonProcess.stdout.on("data", (data) => {
                output += data.toString();
            });

            pythonProcess.stderr.on("data", (data) => {
                reject(data.toString());
            });

            pythonProcess.on("close", (code) => {
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
