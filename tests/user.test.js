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

test("pass", () => {});

test("get user from database", async () => {
  const response = await request(app)
    .get("/users/" + userOne._id)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("name", userOne.name);
});

test("create user", async () => {
  const response = await request(app).post("/users").send(userTwo).expect(200);

  expect(response.body).toHaveProperty("name", userTwo.name);
});
