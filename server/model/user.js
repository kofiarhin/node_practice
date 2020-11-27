const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
}); 


userSchema.methods.generateToken  = function() {

    const user = this;
    const token = jwt.sign({_id: user._id}, "password123"); 

    return token;
}

const User =  mongoose.model("User", userSchema);


module.exports = User;