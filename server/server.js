const app = require("./app")


app.get("/", (req, res) => {
    res.send("hello World")
})



const port = process.env.PORT || 3000;

app.listen(port , () => console.log("listening on port" +  port ))