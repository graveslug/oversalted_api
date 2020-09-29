//==================//
//    Dependencies  //
//==================//
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')


//==================//
//  Routes          //
//==================//


// INDEX
router.get('/', (req, res) => {
  // look up all the users in the mongodb
  // send the users to the Index view as a prop
  User.find({}, (error, allUsers) => {
    if(allUsers){
        res.render('user/Index', {
          user: allUsers,
        })
    } else {
        console.log('index route:' +error.message)
    }
  })
})

// NEW
router.get('/new', (req, res) => {
  res.render('user/New')
})

// DESTROY
router.delete('/:id', (req, res)=>{
    User.remove({_id: req.params.id}, (error, deletedUser)=>{
        if (deletedUser) {
            console.log(deletedUser)
        } else {
            console.log('destroy route:' + error.message)
        }
        res.redirect('/')//Need to figure out what to do redirect to
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedUser) => {
        if (updatedUser) {
            console.log(updatedUser)
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
  User.create(req.body, (error, createdUser) => {
      error ? res.send('create route:' + error.message) : res.redirect('/records')
  })
})

//EDIT
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (user) {
            console.log(user)
            res.render('user/Edit', {
                user: user
            })
        } else {
            console.log('edit route:' + error.message)
        }
    })
})

// SHOW
router.get('/:id', (req, res) => {
    console.log(req.params.id)
  User.findById(req.params.id, (error, foundUser) => {
      if(error) {
          console.log('show route:' + error.message)
          res.sendStatus(500)
      } else {
    res.render('user/Show', {
      user: foundUser,
    })
}
  })
})

//export router
module.exports = router