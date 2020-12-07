const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
require("./db/mongoose");

// setup middlewares
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send({ message: "hello World" });
});

module.exports = app;
