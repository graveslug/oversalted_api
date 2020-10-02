//============================//
//      Dependencies          //
//============================//
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const bodyParser = require('body-parser')
// const passport = require('./config/passport')();
const logger = require('morgan')

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
//Turns off a deprication error with findByIdAndUpdate
mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false.
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(logger('dev'))

//============================//
//         Routes             //
//============================//
const users = require('./routes/users')
app.use('/users', users)


// const forumsRoute = require('./routes/forums')
// app.use('/forum', forumsRoute)
//
// const commentsRoute = require('./routes/comments')
// app.use('/comment', commentsRoute)

// const tagsRoute = require('./routes/tags')
// app.use('/tag', tagsRoute)

//============================//
//             PORT           //
//============================//
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
