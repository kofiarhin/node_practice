const User = require("../server/model/user")


const userOne = {
    name: "kofi ahrin",
    email: 'kofiarhin@gmail.com',
    password: "password123"
}

test("hash user password", async () => {
            const user = new User(userOne); 
            console.log(user)

})