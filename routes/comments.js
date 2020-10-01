const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')


//============================//
//        Show all comment    //
//============================//
//!!!THOUGHT!!! Not sure if I need this whole block or not.
//Index: grabs all comment posts
router.get('/', async (req, res) => {
    try{
        const comments = await Comment.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: comments})
    }catch(error){
        res.json({message:error})
    }
})

//============================//
//       Deletes a comment    //
//============================//
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = Comment.remove({_id: req.params.commentId })
        res.status(200).json({message: "You've destroyed that file"})
    }catch(error){
        res.json({ message: error})
    }
})

//============================//
//        Update a comment    //
//============================//
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

//============================//
//     Create a Comment       //
//============================//
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

//============================//
//     Show req comment       //
//============================//
//Show: Shows a single comment
//!!!THOUGHTS!!! Should this be exchanged for rendering all comments on a page or have the user select the comment and render it as a single view page. Do I want to chain comments down the road? Hm.
router.get('/:commentId', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        res.json({message: comment})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
