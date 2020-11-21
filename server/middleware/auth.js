const jwt = require("jsonwebtoken");
const User = require("../model/user");


const auth = async(req, res, next) => {

   try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const payload  = jwt.verify(token, "password123");

    const { _id } = payload;

    const user  = await User.findById(_id);
    
    if(!user) return res.status(404).send({ error: 'please authenticate'})

    req.user = user;
    next();
   }catch(e) {

    res.status(400).send()
   }

}


module.exports = auth;