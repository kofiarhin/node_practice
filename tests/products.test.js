const Product = require("../server/model/product")
const mongoose = require("mongoose")
const app = require("../server/app")
const request = require("supertest")
require("../server/db/mongoose")


const productOneId = mongoose.Types.ObjectId()
const productOne = {
    _id: productOneId,
    name: "iphone 12",
    description: "some details about product",
    price: 200
}


// setup teardown
beforeEach ( async() => {

    await Product.deleteMany();
    await new Product(productOne).save()
})

afterAll(async() => {

    await mongoose.connection.close()
})


test("pass", () => {})

// create product
test("create product with valid details", async() => {

    const response = await request(app).post("/products").send({
        name: 'mac book pro',
        description: "some details about mac",
        price: 1200
    }).expect(201)
   
})

test("cannot create product with invalid details", async() => {

        const response = await request(app).post("/products").send().expect(400)
});


test("get product from database", async() => {

            const response = await request(app).get("/products/"+productOneId).send().expect(200);


            expect(response.body).toHaveProperty("name", productOne.name)

})