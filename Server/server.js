const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/api/home", (req, res) => {
  res.json({ message: "Server loaded!" });
});

//Import ct router
const ctRouter = require("./routes/ctRouter");
app.use("/api/ct", ctRouter);
