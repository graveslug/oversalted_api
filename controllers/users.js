const User = require('../models/user')
const Forum = require('../models/forum')
const Comment = require('../models/comment')

module.exports = {
    //============================//
    //        User                //
    //============================//
    //finds user
    index: async (req, res, next) => {
        try{
            const users = await User.find({})//.limit(10) would be useful if I wanted to add a limit to the query
            res.json({message: users})
        }catch(error){
            res.json({message:error})
        }
    },
    //creates a new user
    newUser: async (req, res, next) => {
        try{
            const newUser = await new User(req.body)
            const user = await newUser.save()
            res.json({message: userPost})
        }catch(error) {
            res.json({message: error})
        }
    },

    getUser: async (req, res, next) => {
        try{
            const user = await User.findById(req.params.userId)
            res.json({message: user})
        }catch(error){
            res.json({message: error})
        }
    },
    //!!!TODO!!! Enforce all updates to replace user
    putUser: async (req, res, next) => {
        const replaceUser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(replaceUser, newUser)
            res.status(200).json({message: result})
        }catch(error){
            res.json({ message: error })
        }
    },

    patchUser: async (req, res, next) => {
        const patchUser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(patchUser, newUser)
            res.status(200).json({message: result})
        }catch(error){
            res.json({ message: error })
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const removedUser = User.remove({_id: req.params.userId })
             res.status(200).json({message: "You've destroyed the file"})
        }catch(error){
            res.json({ message: error})
        }
    },

    //============================//
    //        User => Forum       //
    //============================//

    getUserForums: async (req, res, next) =>{
        const userId = req.params.userId
        const user = await User.findById(userId)
        try {
            res.status(200).json(user._forum)
        } catch (error) {
            res.json({ message: error })
        }
    },

    newUserForum: async (req, res, next) =>{
        const userId = req.params.userId
        //create new forum with users request
        const newForum = new Forum(req.body)
        //get user
        const user = await User.findById(userId)
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
    },

    //============================//
    //      User => Comment       //
    //============================//
    getComment: async (req, res, next) =>{
        const userId = req.params.userId
        const user = await User.findById(userId)
        try {
            res.status(200).json(user._comment)
        } catch (error) {
            res.json({ message: error })
        }
    },
}
