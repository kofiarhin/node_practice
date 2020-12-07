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
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// generate auth token
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "password123");

    const user = this;
    user.tokens = user.tokens.concat({ token});

    await user.save()
    return token;
};

// find user by credentials
userSchema.statics.findByCredentials = async(email, password) =>  {



     const user = await User.findOne({ email})
  
     if(!user) {
       throw new Error("user not found")
     }

     const isMatch = await bcrypt.compare(password, user.password)

  

    if(!isMatch)  throw new Error("user not found")


    return user;
}


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
