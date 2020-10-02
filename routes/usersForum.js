const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Forum = require('../models/forum')


//gets all x users forums
router.get('/', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    try {
        console.log('user', user)
    } catch (error) {
        res.json({ message: error })
    }
})

//user adds new forum
router.post('/', async (req, res) => {

})
module.exports = router
