const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = commentSchema