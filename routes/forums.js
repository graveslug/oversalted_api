const express = require('express')
const router = express.Router()
const Forum = require('../models/forum')

//Index: grabs all forum posts
router.get('/', async (req, res) => {
    try{
        const forums = await Forum.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: forums})
    }catch(error){
        res.json({message:error})
    }
})


//Deletes a posts
router.delete('/:forumId', async (req, res) => {
    try {
        const removedForum = Forum.remove({_id: req.params.forumId })
        res.status(200).json({message: "You've destroyed that file"})
    }catch(error){
        res.json({ message: error})
    }
})

//Update a post
router.patch('/:forumId', async (req, res) => {
    try {
        const updatedForum = await Forum.updateOne(
            { _id: req.params.forumId },
            { $set:
                { body: req.body.body }
            }
        )
        res.json({message: updatedForum})
    }catch(error){
        res.json({ message: error })
    }
})

//Create: a new forum post
router.post('/', async (req, res) => {
    const forum = new Forum({
        title: req.body.title,
        body: req.body.body
    })
    try{
        const forumPost = await forum.save()
        res.json({message: forumPost})
    }catch(error) {
        res.json({message: error})
    }
})
//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  forum = new Forum({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     forum.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })


//Show: Shows a single requested page
router.get('/:forumId', async (req, res) => {
    try{
        const forum = await Forum.findById(req.params.forumId)
        res.json({message: forum})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
