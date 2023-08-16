const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Server loaded!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
