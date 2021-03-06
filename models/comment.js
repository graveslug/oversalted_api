//============================//
//         comment model        //
//============================//

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
            },
        _userComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: { type: Date, default: Date.now }
    }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
