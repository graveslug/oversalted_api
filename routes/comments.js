const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

//Not sure if I need this whole block or not.
//Index: grabs all comment posts
// router.get('/', async (req, res) => {
//     try{
//         const comments = await Comment.find()//.limit(10) would be useful if I wanted to add a limit to the query
//         res.json({message: comments})
//     }catch(error){
//         res.json({message:error})
//     }
// })

//Deletes a posts
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = Comment.remove({_id: req.params.commentId })
        res.status(200).json({message: "You've destroyed that file"})
    }catch(error){
        res.json({ message: error})
    }
})

//Update a post
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set:
                { body: req.body.body }
            }
        )
        res.json({message: updatedComment})
    }catch(error){
        res.json({ message: error })
    }
})

//Create: a new comment post
router.post('/', async (req, res) => {
    const comment = new Comment({
        body: req.body.body
    })
    try{
        const commentPost = await comment.save()
        res.json({message: commentPost})
    }catch(error) {
        res.json({message: error})
    }
})
//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  comment = new Comment({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     comment.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })


//Show: Shows a single requested page
router.get('/:commentId', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        res.json({message: comment})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
