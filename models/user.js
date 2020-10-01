    //============================//
    //          User Model        //
    //============================//

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        _forumId: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Forum"
            }
        ],
        _tagId: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
            }
        ],
        _userCommentId: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            }
        ]
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User
