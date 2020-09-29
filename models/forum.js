//============================//
//         forum model        //
//============================//

const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        _owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        _comment_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            }
        ],
        _tag_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
            }
        ],
        createdAt: { type: Date, default: Date.now }

    }
)

const Forum = mongoose.model('Forum', forumSchema)
module.exports = Forum
