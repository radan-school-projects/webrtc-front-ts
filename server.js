const path = require("path");
const express = require("express");

const CWD = process.cwd();
const port = process.env.NODE_ENV || 5009;

const publicPath = path.join(CWD, "build");
const app = express();

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
