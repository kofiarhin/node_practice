const  User = require("../server/model/user")
const mongoose = require("mongoose")
require("../server/db/mongoose")
const request = require("supertest")
const app = require("../server/app")
const jwt = require("jsonwebtoken")


const userOneId = mongoose.Types.ObjectId()
const token = jwt.sign({_id: userOneId}, "password123")


const userOne = {
    _id: userOneId,
    name: "kofi arhin",
    email: 'kofiarhin@gmail.com',
    password: "password"
}


// setup and teardown

beforeEach ( async() => {

    await User.deleteMany()
    await new User(userOne).save();
    
})


afterAll(async() =>  {
    await mongoose.connection.close()
})


test("generate tokens", () => {

        const user = new User(); 
        const token  = user.generateToken();

        expect(token.length).toBeGreaterThan(20)


});


test("create user ", async() => {

        const response = await request(app).post("/users").send({
            name: "lebron james",
            email: "lebron@gmail.com",
            password: "password"
        }).expect(201)
});

test("cannot create user with invalid data", async() => {

    const response = await request(app).post("/users").send().expect(400)
})

test("get users from database", async () =>{

    const response = await request(app).get("/users").send().expect(200);
    expect(response.body[0]).toHaveProperty("name", userOne.name)
})


test("login user with valid credentials", async() => {

        const response = await request(app).post("/login").send({ email: userOne.email, password: userOne.password}).expect(200)

});

test("cannot login with invalid credetials",async() => {

    const response = await request(app).post("/login").send({email: userOne.email, password: "somepassword"}).expect(404)

})



test("update user", async() => {

       const response = await request(app).patch("/users").set("Authorization", `Bearer ${token}`).send({name: "joshua", password: "password123"}).expect(200);

       expect(response.body).toHaveProperty("name", "joshua")
})

test("delete user from database", async() => {

        const response  = await request(app).delete("/users").set("Authorization", `Bearer ${token}`).expect(200)
});


test("get user from database", async() => {

    const response = await request(app).get(`/users/me`).set("Authorization", token).send().expect(200);

    expect(response.body).toHaveProperty("name", userOne.name)
})



test("cannot get user details if not logged in",  async() => {

    const response = await request(app).get("/users/me").send().expect(400)
})