    //==================//
    //    Dependencies  //
    //==================//
const express = require('express')
const router = express.Router()
const Forum = require('../models/forum.js')


    //==================//
    //  Routes          //
    //==================//


// INDEX, grabs all the posts
router.get('/', (req, res) => {
  // look up all the forums in the mongodb
  // send the forums to the Index view as a prop
  Forum.find({}, (error, allForums) => {
    if(allForums){
        res.render('forum/Index', {
          forum: allForums,
        })
    } else {
        console.log('index route:' + error.message)
    }
  })
})

// NEW
router.get('/new', (req, res) => {
  res.render('forum/New')
})

// DELETE, gets rid of the post
router.delete('/:id', (req, res)=>{
    Forum.remove({_id: req.params.id}, (error, deletedForum)=>{
        if (deletedForum) {
            console.log(deletedForum)
        } else {
            console.log('destroy route:' + error.message)
        }
        res.status(200).json({message: "You've destroyed the file"})
    })
})

//UPDATE, updates the WHOLE document
router.put('/:id', (req, res) => {
    Forum.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedForum) => {
        if (updatedForum) {
            console.log(updatedForum)
        } else {
            console.log('update route:' + error.message)
        }
        res.status(200).json({message: "You've udpated the file"})
    })
})

// CREATE Submits a new post
router.post('/create', (req, res) => {
  // console.log(req.body)

    Forum.create(req.body, (error, createdForum) => {
        error ? res.send('create route:' + error.message) : res.status(200).json(
          {
              message: "You've created the file"
          }
        )
    })
})

//EDIT, edits the post
router.get('/:id/edit', (req, res) => {
    Forum.findById(req.params.id, (error, forum) => {
        if (forum) {
            console.log(forum)
            res.render('forum/Edit', {
                forum: forum
            })
        } else {
            console.log('edit route:' + error.message)
        }
    })
})

// SHOWs the document
router.get('/:id', (req, res) => {
    console.log(req.params.id)
  Forum.findById(req.params.id, (error, foundForum) => {
      if(error) {
          console.log('show route:' + error.message)
          res.sendStatus(500)
      } else {
    res.render('forum/Show', {
      forum: foundForum,
    })
}
  })
})

//export router
module.exports = router
