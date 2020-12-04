const mongoose = require("mongoose")
const app = require("../server/app")
const User = require("../server/model/user")
const request = require("supertest")


const userOneId = mongoose.Types.ObjectId()
const userTwoId = mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: "kofi arhin",
  email: "kofiarhin@gmail.com",
  password: "password"
}
const userTwo = {
  _id: userTwoId,
  name: "lebron james",
  email: "lebron@gmail.com",
  password: "password123"
}

// setup teardown
beforeEach ( async() => {

  await User.deleteMany()
  await new User(userOne).save()
})

afterAll(async() => {
  await mongoose.connection.close()
})


// passing test
test("should just pass", () => {})

// test create user
test("create user", async() => {

  const response = await request(app).post("/users").send(userTwo).expect(201)
})


// should not create duplicate users
test("should not create duplicate user", async() => {
    const response = await request(app).post("/users").send(userOne).expect(400)

});


// should not create user with invalid fields
test("should not create user with invalid fields", async() => {

     const response = await request(app).post("/users").send().expect(400)
})


// get user from database
test("get user from database", async() => {

  const response = await request(app).get("/users/"+userOne._id).send().expect(200);

  console.log(response.body)
})
