const mongoose =  require("mongoose")


mongoose.connect("mongodb://localhost:27017/test", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then ( ()  => console.log("connected to database"))