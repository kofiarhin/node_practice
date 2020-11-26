const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const publicPath = path.join(__dirname, "../public")
const Product = require("./model/product")


// connect to database
mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then ( () => console.log('connected to database!'))
// setup middleware
app.use(express.static(publicPath))


// get list of products
app.get("/products", async(req, res) => {

    const products = [{
        name: "iphone 12",
        price: 200
    }, 
    
    {
        name: "macbook pro",
        price: 400
    }
]

    res.send(products)
})



module.exports = app;