const express = require("express");
const app = express();
const port = 3000;
const { listFiles } = require("./readDir.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAllFiles", async (req, res) => {
  const files = await listFiles("./public/images");
  res.status(200).json({
    message: files,
  });
});

app.use("/myFiles/", express.static("public"));

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
