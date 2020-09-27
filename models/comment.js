//CURRENTLY NOT IN USE EXPERIMENTING WITH ADDING COMMENTS DIRECTLY TO FORUM
//============================//
//         comment model        //
//============================//

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        body: String,
        required: true,

        createdAt: { type: Date, default: Date.now }
    }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
