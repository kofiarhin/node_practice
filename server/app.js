const express = require("express")
const app = express();
const User = require("./model/user")
const mongoose = require("mongoose")
const auth = require("./middleware/auth")
require("./db/mongoose")

// setup middlewares
app.use(express.json())


const handleErrors = (errors) => {

    
}
app.get("/users", async (req, res ) => {

    const users = await User.find({});

    if(!users) return res.status(404).send({ error: "users not found"})
    res.send(users)
})

app.post("/users", async(req, res) => {
 
    try {
    const  user = new User(req.body);
    await user.save()

    res.status(201).send()
    }catch(e) {

        const errors = handleErrors(e.errors)
        res.status(400).send()
    }
   
})


app.post("/login", async(req, res) => {

    const {email, password } = req.body;
    const user = await User.findOne({email});

    if(!user) return res.status(404).send({ error: "user not found!"})

    if(user.password !== password) return res.status(404).send({error: "invalid email/pasword combination"})
    res.send(user)
})


// get user from database
app.get("/users/me", auth,  async(req, res) => {

        if(!req.user) return res.status(404).send();
        res.send(req.user)
})


app.patch("/users", auth,  async(req, res) => {

    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true});

    if(!user) return res.status(400).send();
    res.send(user)
})


app.delete("/users", auth,  async(req, res) => {

    const { _id } = req.user;

    
    try {
        
        const user = await User.findByIdAndDelete(_id);
        if(!user) return res.status(400).send({ error: "user not found"})
        res.send()
    }catch(e) {

        res.status(500).send()
    }

    
})

module.exports = app;