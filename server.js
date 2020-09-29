    //============================//
    //      Dependencies          //
    //============================//
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser')



    //============================//
    //   Database connections     //
    //============================//
const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

db.on("open", () => {
      console.log("Mongo is Connected")
})



    //============================//
    //        MiddleWare          //
    //============================//
app.use(cors())
app.use(express.json())
app.use(passport.initialize())



    //============================//
    //      Controllers           //
    //============================//
//Controllers the user in creating, updating, and deleting from the user model.
app.use("/user", require("./controllers/users"))

//app.use("/tag", require("./controllers/tag"))

//app.use("/forum", require("./controllers/forum"))

    //============================//
    //             PORT           //
    //============================//
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
