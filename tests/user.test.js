const app = require("../server/app")
const request = require("supertest")
const  mongoose = require("mongoose")
const User = require("../server/model/user")


const userOne = {
  name: "kofi  arhin",
  email: "kofiarhin@gmail.com",
  password: "password123",
}


beforeEach( async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

// user two
const userTwo = {
  name: "lebron james",
  email: "lebron@gmail.com",
  password: "password123"
}

afterAll(async() => {

  await mongoose.connection.close()
})





test("login user with valid credentials", async() => {

  const response = await request(app).post('/users/login').send({ email: userOne.email, password: userOne.password}).expect(200)

expect(response.body.user).toHaveProperty("name", userOne.name)

})


test("cannot login user with invalid credentials", async() => {

  const response = await request(app).post("/users/login").send({ email: userOne.email, password: "password"})
})
