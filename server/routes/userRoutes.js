const { Router} = require("express")
const User = require("../model/user")

const router = Router()


// create user
router.post("/users", async( req, res) => {
   
    const user   = new User(req.body);

    try {
      
      await user.save()
      res.status(201).send()

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

module.exports = router;