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