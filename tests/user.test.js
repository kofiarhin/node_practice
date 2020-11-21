const  User = require("../server/model/user")
const mongoose = require("mongoose")
require("../server/db/mongoose")

const userOneId = mongoose.Types.ObjectId() 

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