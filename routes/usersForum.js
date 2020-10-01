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
    const userId = req.params.userId
    //create new forum with users request
    //console.log(userId)
    const newForum = new Forum(req.body)
    console.log(newForum)
    //get user
    const user = await User.findById(userId)
    console.log(user)
    try {
    //assign user as a forums owner (this references the forumSchema and assigning it an owner)
        newForum._owner = user
    //save the forum
        await newForum.save()
    //add forum to users _forums id within the userSchema
        user._forum.push(newForum)
    //save user
        await user.save()
        res.status(200).json({createdForum : newForum})
    } catch(error) {
        res.json({ createdForum: error })
}
})
module.exports = router
