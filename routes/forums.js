const express = require('express')
const router = express.Router()
const ForumsController = require('../controllers/forums')

router.route('/')
    .get(ForumsController.index)

router.route('/:forumId')
    .get(ForumsController.getForum)
    .delete(ForumsController.deleteForum)
    .put(ForumsController.putForum)
    .patch(ForumsController.patchForum)

module.exports = router
