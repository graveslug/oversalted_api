const express = require('express')
const router = express.Router()

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
//    .delete(usersController.deleteUserForum)
//    .edit(usersController.editUserForum)


module.exports = router
