const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// generate auth token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "password123");

  return token;
};

// hash password
userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    user.password = hashPassword;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
