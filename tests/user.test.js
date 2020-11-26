const request = require("supertest")
const app = require("../server/app")
const mongoose = require("mongoose")


test("pass", async () => {

        const response = await request(app).get("/products?search=macbook").send().expect(200);

})

test("no search provided", async() => {

            const response = await request(app).get("/products").send().expect(400)
})
