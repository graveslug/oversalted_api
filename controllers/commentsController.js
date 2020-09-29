//==================//
//    Dependencies  //
//==================//
const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.js')


//==================//
//  Routes          //
//==================//


// INDEX
router.get('/', (req, res) => {
  // look up all the comments in the mongodb
  // send the comments to the Index view as a prop
  Comment.find({}, (error, allComments) => {
    if(allComments){
        res.render('comment/Index', {
          comment: allComments,
        })
    } else {
        console.log('index route:' +error.message)
    }
  })
})

// NEW
router.get('/new', (req, res) => {
  res.render('comment/New')
})

// DESTROY
router.delete('/:id', (req, res)=>{
    Comment.remove({_id: req.params.id}, (error, deletedComment)=>{
        if (deletedComment) {
            console.log(deletedComment)
        } else {
            console.log('destroy route:' + error.message)
        }
        res.redirect('/')//Need to figure out what to do redirect to
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedComment) => {
        if (updatedComment) {
            console.log(updatedComment)
        } else {
            console.log('update route:' + error.message)
        }
        res.redirect("/")//Need to figure out what to do redirect to
    })
})

// CREATE
router.post('/', (req, res) => {
  // console.log(req.body)

  if (req.body.inStock === 'on') {
    req.body.inStock = true
  } else {
    req.body.inStock = false
  }
  Comment.create(req.body, (error, createdComment) => {
      error ? res.send('create route:' + error.message) : res.redirect('/records')
  })
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Comment.findById(req.params.id, (error, comment) => {
        if (comment) {
            console.log(comment)
            res.render('comment/Edit', {
                comment: comment
            })
        } else {
            console.log('edit route:' + error.message)
        }
    })
})

// SHOW
router.get('/:id', (req, res) => {
    console.log(req.params.id)
  Comment.findById(req.params.id, (error, foundComment) => {
      if(error) {
          console.log('show route:' + error.message)
          res.sendStatus(500)
      } else {
    res.render('comment/Show', {
      comment: foundComment,
    })
}
  })
})

//export router
module.exports = router
