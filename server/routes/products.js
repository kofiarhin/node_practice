const { Router } = require("express")

const router = Router();


router.get("/products", (req, res) => {

    res.send({ message: "send list of products"})
})

module.exports = router;