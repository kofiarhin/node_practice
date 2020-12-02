const app = require("../server/app");
const mongoose = require("mongoose");
const User = require("../server/model/user");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const userOneId = mongoose.Types.ObjectId();
const userThreeId = mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "kofi arhin",
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

test("pass", () => {});

// creat user

test("create user", async () => {
  const response = await request(app).post("/users").send(userTwo).expect(200);

  // assertions
  expect(response.body).not.toBeNull();
  expect(response.body.password).not.toEqual(userTwo.password);
});

test("password is hashed", async () => {
  const user = await User.findById(userOne._id);

  // assertions
  expect(user.password).not.toEqual(userOne.password);
});

// get user by id
test("get user with id", async () => {
  const response = await request(app)
    .get("/users/" + userOne._id)
    .send()
    .expect(200);

  expect(response.body.name).toEqual(userOne.name);
});

test("return 404 if invalid id is passed", async () => {
  const response = await request(app).get("/users/1").send().expect(404);
});

test("generate auth token", async () => {
  const user = new User();
  const token = user.generateAuthToken();
  const payload = jwt.verify(token, "password123");

  // assetions
  expect(payload).toHaveProperty("_id");
  expect(payload._id.length).toBeGreaterThan(0);
});

test("verify auth token", async () => {
  const user = new User({
    _id: userThreeId,
    name: "kyrie Irving",
    email: "kyrie@gmai.com",
    password: "password123",
  });

  await user.save();

  const token = await user.generateAuthToken();

  const payload = jwt.verify(token, "password123");

  const data = await User.findById(payload._id);

  // assertions
  expect(data).toHaveProperty("name", user.name);
});

// update user field
test("update user field", async () => {});
