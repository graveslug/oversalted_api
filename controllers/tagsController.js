//==================//
//    Dependencies  //
//==================//
const express = require('express')
const router = express.Router()
const Tag = require('../models/tag.js')


//==================//
//  Routes          //
//==================//


// INDEX
router.get('/', (req, res) => {
  // look up all the tags in the mongodb
  // send the tags to the Index view as a prop
  Tag.find({}, (error, allTags) => {
    if(allTags){
        res.render('tag/Index', {
          tag: allTags,
        })
    } else {
        console.log('index route:' + error.message)
    }
  })
})

// NEW
router.get('/new', (req, res) => {
  res.render('tag/New')
})

// DESTROY
router.delete('/:id', (req, res)=>{
    Tag.remove({_id: req.params.id}, (error, deletedTag)=>{
        if (deletedTag) {
            console.log(deletedTag)
        } else {
            console.log('destroy route:' + error.message)
        }
        res.status(200).json({message: "You've destroyed the file"})
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    Tag.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedTag) => {
        if (updatedTag) {
            console.log(updatedTag)
        } else {
            console.log('update route:' + error.message)
        }
        res.status(200).json({message: "You've update the file"})
    })
})

// CREATE
router.post('/create', (req, res) => {
  // console.log(req.body)

  if (req.body.inStock === 'on') {
    req.body.inStock = true
  } else {
    req.body.inStock = false
  }
  Tag.create(req.body, (error, createdTag) => {
      error ? res.send('create route:' + error.message) : res.status(200).json({message: "You've created the file"})
  })
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Tag.findById(req.params.id, (error, tag) => {
        if (tag) {
            console.log(tag)
            res.render('tag/Edit', {
                tag: tag
            })
        } else {
            console.log('edit route:' + error.message)
        }
    })
})

// SHOW
router.get('/:id', (req, res) => {
    console.log(req.params.id)
  Tag.findById(req.params.id, (error, foundTag) => {
      if(error) {
          console.log('show route:' + error.message)
          res.sendStatus(500)
      } else {
    res.render('tag/Show', {
      tag: foundTag,
    })
}
  })
})

//export router
module.exports = router
