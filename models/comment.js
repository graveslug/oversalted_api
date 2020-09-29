//============================//
//         comment model        //
//============================//

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        body: String,
        required: true,
        _userComment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: { type: Date, default: Date.now }
    }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
