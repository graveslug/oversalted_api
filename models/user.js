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
        forumEntries: [
            {
            type: Schema.Types.ObjectId,
            ref: "Forum"
        }],
        tagEntries: [
            {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }],
        commentEntries: [
            {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User
