const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    vote: {
        type: String, enum: ["Hot", "Not"],
		default: "Hot"
    },
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = voteSchema