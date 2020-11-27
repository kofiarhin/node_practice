const app = require("../server/app")
const request = require("supertest")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = require("../server/model/user")
const userOneId = mongoose.Types.ObjectId();
const token = jwt.sign({_id: userOneId}, "password123");





const userOne = {

    _id: userOneId,
    name: "kofi arhin",
    email: "kofiarhin@gmail.com",
    password: "password",
    token
}


beforeEach(async() => {

    await User.deleteMany();
    await new User(userOne).save()

})

afterAll( async() => {
    await mongoose.connection.close()
})



// test file upload

test("file upload", async () => {


            const response = await request(app).post("/uploads")
            .set("Authorization", `Bearer ${token}`)
            .attach("avatar", "tests/fixtures/test.jpg").expect(200)
});