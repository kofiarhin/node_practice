const { Router, request } = require("express");
const User = require("../model/user");

const router = Router();

router.get("/users", (req, res) => {
  res.send({ message: "send user details" });
});

// create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// get user from database``
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send();

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

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send();

  const user = await User.findByIdAndDelete(id);

  if (!user) return res.status(404).send();
  res.send();
});
module.exports = router;
