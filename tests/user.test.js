const mongoose = require("mongoose")
require("../server/db/mongoose")
const User = require("../server/model/user")


beforeEach ( async() => {

    await  User.deleteMany(); 
})

afterAll( async() => {

    await mongoose.connection.close()
})

const userOne = {
    name: "kofi ahrin",
    email: 'kofiarhin@gmail.com',
    password: "password123"
}

test("hash user password", async () => {
            const user = await  new User(userOne).save();
        
            expect(user.password).not.toBe(userOne.password)
            expect(user.password.length).toBeGreaterThan(20)
})


test('generate authentication token', async() => {

    const  user = await new User(userOne).save();

    console.log(user)
})
