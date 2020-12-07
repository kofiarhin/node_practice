const mongoose = require("mongoose");
// connect to database

mongoose
  .connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database!"))
  .catch((e) => console.log(e.message));
