const express = require('express')
const router = express.Router()
const User = require('../models/user')


//============================//
//        Show all Users      //
//============================//
router.get('/', async (req, res) => {
    try{
        const users = await User.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: users})
    }catch(error){
        res.json({message:error})
    }
})

//============================//
//        Deletes user        //
//============================//
//Deletes a user
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = User.remove({_id: req.params.userId })
        res.status(200).json({message: "You've destroyed the file"})
    }catch(error){
        res.json({ message: error})
    }
})

//============================//
//  Update all User Fields    //
//============================//
//!!!TODO!!! Enforce all updates to replace(update) user
router.put('/:userId', async (req, res) => {
    const replaceUser = req.params.userId
    const newUser = req.body
    try {
        const result = await User.findByIdAndUpdate(replaceUser, newUser)
        res.status(200).json({message: result})
    }catch(error){
        res.json({ message: error })
    }
})

//============================//
//  Patches users             //
//============================//
//Instead of replacing the user; patch will update whatever fields are requested by req.body from the user.
router.patch('/:userId', async (req, res) => {
    const patchUser = req.params.userId
    const newUser = req.body
    try {
        const result = await User.findByIdAndUpdate(patchUser, newUser)
        res.status(200).json({message: result})
    }catch(error){
        res.json({ message: error })
    }
})

//============================//
//     Create a new User      //
//============================//
//Create: a new user post
router.post('/create', async (req, res) => {
    const newUser = new User(req.body)
    try{
        const userPost = await newUser.save()
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

//============================//
//    Get user by id          //
//============================//
//This gets the user by the id
router.get('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        res.json({message: user})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
