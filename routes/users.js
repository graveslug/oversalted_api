const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Index: grabs all user posts
router.get('/', async (req, res) => {
    try{
        const users = await User.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: users})
    }catch(error){
        res.json({message:error})
    }
})

//Deletes a posts
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = User.remove({_id: req.params.userId })
        res.status(200).json({message: "You've destroyed the file"})
    }catch(error){
        res.json({ message: error})
    }
})

//Update a post
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set:
                { body: req.body.body }
            }
        )
        res.json({message: updatedUser})
    }catch(error){
        res.json({ message: error })
    }
})

//Create: a new user post
router.post('/', async (req, res) => {
    const user = new User({
        title: req.body.title,
        body: req.body.body
    })
    try{
        const userPost = await user.save()
        res.json({message: userPost})
    }catch(error) {
        res.json({message: error})
    }
})
//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  user = new User({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     user.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })


//Show: Shows a single requested page
router.get('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        res.json({message: user})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
