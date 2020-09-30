//============================//
//          Tag Model        //
//============================//

const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        _forum_id: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Forum"
            }
        ]
    }
)

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag
