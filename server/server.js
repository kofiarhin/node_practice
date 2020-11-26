const express = require("express")
const app = express()
const path = require("path")
const publicPath = path.join(__dirname, "../public/")
const Product = require("./model/product")
require("./db/mongoose")

app.use(express.static(publicPath))
app.use(express.json())


app.post("/products", async(req, res) => {

    const product = new Product(req.body);
    await product.save()
    res.send(product)
})

app.get("/products",  async(req, res) => {
 
        const products = await Product.find({});
        res.send(products)
})

app.delete("/products", async(req, res) => {
     await Product.deleteMany();
     res.send({message: 'products deleted'})
})

const port = process.env.PORT
app.listen(port, () => console.log("listening on " + port))