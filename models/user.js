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
        _forum_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Forum"
        }],
        _tag_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
            }
        ],
        _userComment_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            }
        ]
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User
