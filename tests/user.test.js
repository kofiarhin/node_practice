const app = require("../server/app");
const mongoose = require("mongoose");
const User = require("../server/model/user");
const request = require("supertest");

const userOneId = mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "kofi",
  email: "kofiarhin@gmail.com",
  password: "password123",
};

const userTwo = {
  name: "lebron james",
  email: "lebron@gmail.com",
  password: "password123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

// create user

test("create user", async () => {
  const response = await request(app).post("/users").send(userTwo).expect(200);

  expect(response.body).toHaveProperty("name", userTwo.name);
});

// get user
test("get user from database", async () => {
  const response = await request(app)
    .get("/users/" + userOne._id)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("name", userOne.name);
});

// update user
test("update user", async () => {
  const response = await request(app)
    .patch("/users/" + userOne._id)
    .send({ name: "joshua obu", password: "new password" })
    .expect(200);
});

// update invalid field
test("update invalid field", async () => {
  const response = await request(app)
    .patch("/users/" + userOne._id)
    .send({ country: "ghana" })
    .expect(400);
});

// delete user with valid credentials
test("delete user", async () => {
  const response = await request(app)
    .delete("/users/" + userOne._id)
    .send()
    .expect(200);
});

// delete user with invalid credentials
