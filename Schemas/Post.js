const { Schema, model } = require('mongoose');

const PostSchema = Schema({
    text: {
        type:String
    },
    userID: {
        type: String,
        ref: 'User'
    },
    date: {
        type: Date
    }
})

module.exports = model('Post', PostSchema);