const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')

//============================//
//        Show all Tags       //
//============================//
//Renders a list of all tags
//!!!TODO!!! Renders name and a small body of a description for the tag
router.get('/', async (req, res) => {
    try{
        const tags = await Tag.find()//.limit(10) would be useful if I wanted to add a limit to the query
        res.json({message: tags})
    }catch(error){
        res.json({message:error})
    }
})

//============================//
//        Deletes a Tag       //
//============================//
router.delete('/:tagId', async (req, res) => {
    try {
        const removedTag = Tag.remove({_id: req.params.tagId })
        res.status(200).json({message: "You've destroyed the file"})
    }catch(error){
        res.json({ message: error})
    }
})

//============================//
//       Patch a Tag          //
//============================//
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

//============================//
//        Create a tag        //
//============================//
//a new tag
//!!!!TODO!!!! Admin access only to creating new tags.
router.post('/', async (req, res) => {
    const tag = new Tag({
        name: req.body.name,
        body: req.body.body
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

//============================//
//   Show requested Tag       //
//============================//
//Show: Shows a tag
//!!!!TODO!!!! Add that when I user selects a tag that all related pages with said tag renders an index.
//!!!!TODO!!!! When able to render all related pages as an index limit page amount by n and use pagination
router.get('/:tagId', async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.tagId)
        res.json({message: tag})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
