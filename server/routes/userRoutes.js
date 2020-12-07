<<<<<<< HEAD
const { Router, request } = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");

const router = Router();



router.post("/users/login", async(req, res) => {

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = user.generateAuthToken()

    res.send({ user, token})

  }catch (e) {

    res.status(404).send()
  }



  

})



// create user
router.post("/users", async (req, res) => {

try {

  const  user = new User(req.body);
  const token = await user.generateAuthToken();
  res.status(201).send({ user, token})

}catch(e) {
  res.status(500).send()
}


});



// get user from database``
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send();

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) return res.status(404).send();

  const user = await User.findById(id);

  if (!user) return res.status(404).send();
  res.send(user);
});



// update user
router.patch("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ error: "please provide an email" });

  const validfields = ["name", "email", "password"];
  const fields = Object.keys(req.body);

  const isValid = fields.every((field) => validfields.includes(field));

  if (!isValid) return res.status(400).send({ error: "invalid field" });

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) return res.status(404).send({ error: "user not found!" });
  res.send(user);
});



// delete user
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send();

  const user = await User.findByIdAndDelete(id);

  if (!user) return res.status(404).send(1);
  res.send();
});
module.exports = router;
=======
const { Router, request} = require("express")
const User = require("../model/user")
const auth = require("../middleware/auth")

const router = Router()


// create user
router.post("/users", async( req, res) => {
   
    const user   = new User(req.body);

    try {
      
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token})

    }catch(e) {
      res.status(400).send()
    }

})  


// get user from database
router.get("/users/:id", async(req, res) => {

  const id = req.params.id;

  try {

    const user = await User.findById(id)

    if(!user)  throw new Error({ error: "user not found"})
    res.send(user)
  }catch(e) {

    res.status(404).send()
  }
  
})


// login user

router.post("/users/login",  async(req, res) => {

  const { email ="", password ="" } = req.body;


  try {

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken()
    res.send({ user, token})

  }catch (e) {

    res.status(400).send()

  }



})


router.get("/users/me", auth,  (req, res) => {

  res.send()
})


module.exports = router;
>>>>>>> auth-update
