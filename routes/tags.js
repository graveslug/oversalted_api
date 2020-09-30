const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')

//Index: grabs all tag posts
router.get('/', async (req, res) => {
    try{
        const tags = await Tag.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: tags})
    }catch(error){
        res.json({message:error})
    }
})


//Deletes a posts
router.delete('/:tagId', async (req, res) => {
    try {
        const removedTag = Tag.remove({_id: req.params.tagId })
        res.status(200).json({message: "You've destroyed the file"})
    }catch(error){
        res.json({ message: error})
    }
})

//Update a post
router.patch('/:tagId', async (req, res) => {
    try {
        const updatedTag = await Tag.updateOne(
            { _id: req.params.tagId },
            { $set:
                { name: req.body.name }
            }
        )
        res.json({message: updatedTag})
    }catch(error){
        res.json({ message: error })
    }
})

//Create: a new tag post
router.post('/', async (req, res) => {
    const tag = new Tag({
        name: req.body.name
    })
    try{
        const tagPost = await tag.save()
        res.json({message: tagPost})
    }catch(error) {
        res.json({message: error})
    }
})
//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  tag = new Tag({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     tag.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })


//Show: Shows a single requested page
router.get('/:tagId', async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.tagId)
        res.json({message: tag})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
