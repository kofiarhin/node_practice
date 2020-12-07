const bcrypt = require("bcrypt");
const user = {
  name: "kofi arhin",
  email: "kofiarhin@gmail.com",
  password: "password123",
};

async function init() {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);

  console.log(hashPassword);
}

init();
