const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}); 


userSchema.methods.generateToken  = function() {

    const user = this;
    const token = jwt.sign({_id: user._id}, "password123"); 

    return token;
}
userSchema.pre('save',  async function(next) {
   
    const user = this;
    const salt  = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    user.password = hashedPassword;
    
    next();
})


const User =  mongoose.model("User", userSchema);


module.exports = User;