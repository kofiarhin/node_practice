const mongoose =  require("mongoose")

// const  url = "mongodb+srv://test:Cantoment69@cluster0.lj8un.mongodb.net/node-auth"

const  url = process.env.mongo_url

mongoose.connect(url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then ( ()  => console.log("connected to database"))