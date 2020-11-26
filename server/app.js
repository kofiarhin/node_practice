const express = require("express")
const app = express()


// get list of products
app.get("/products", async(req, res) => {

    if(!req.query.search) {
        return res.status(400).send({ error: "please provide search"})
    }

    res.send({
        search: req.query.search
    })
})



module.exports = app;