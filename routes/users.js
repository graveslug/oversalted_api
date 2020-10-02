const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Forum = require('../models/forum')
usersController = require('../controllers/users')

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser)

router.route('/:userId')
    .get(usersController.getUser)
    .put(usersController.putUser)
    .patch(usersController.patchUser)
    .delete(usersController.deleteUser)

router.route('/:userId/forums')
    .get(usersController.getUserForums)
    .post(usersController.newUserForum)

    
module.exports = router
