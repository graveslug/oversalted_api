    //============================//
    //      Dependencies          //
    //============================//
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const cors = require("cors")
const bodyParser = require('body-parser')
const passport = require("./config/passport")();



    //============================//
    //   Database & connections   //
    //============================//
const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//checks error&&success
db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
db.on('connected', ()=> console.log('Your mongod has connected'))
db.on('disconnected', ()=> console.log('Your mongod has disconnected'))

//opens connection to mongod
db.on('open', ()=>{})



    //============================//
    //        MiddleWare          //
    //============================//
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false.
app.use(bodyParser.json())
app.use(methodOverride('_method'))

    //============================//
    //      Controllers           //
    //============================//
//Controllers the user in creating, updating, and deleting from the user model.
app.use("/user", require("./controllers/usersController"))

app.use("/tag", require("./controllers/tagsController"))

app.use("/comment", require("./controllers/commentsController"))

app.use("/forum", require("./controllers/forumsController"))

    //============================//
    //             PORT           //
    //============================//
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
