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
        text: {
            type: String,
            required: true
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        commentEntries: [
            {
            text: String,
            postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
            }
        }],
        tagEntries: [
            {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }],
        createdAt: { type: Date, default: Date.now }

    }
)

const Forum = mongoose.model('Forum', forumSchema)
module.exports = Forum
