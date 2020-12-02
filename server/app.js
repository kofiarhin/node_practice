const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const productRouter = require("./routes/products");
require("./db/mongoose");

// setup middlewares
app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.get("/", (req, res) => {
  res.send({ message: "hello World" });
});

module.exports = app;
