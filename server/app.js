const express = require("express")
const app = express();
const multer = require("multer")
const mongoose = require("mongoose")
const auth = require("./middleware/auth")

// connect to database
mongoose.connect(process.env.mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
}).then( () => console.log("connected to database!"))


// setup middleware
app.use(express.json())
const upload = multer({
    limits: {
        fileSize: 2000000
    }
})

app.post("/uploads",  auth , upload.single("avatar"),  async(req, res) => {

    req.user.avatar = req.file.buffer;

    await req.user.save()
    res.send({user: req.user})
})

module.exports  = app;