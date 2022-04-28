const mongoose = require('mongoose')

const User = require('./outfits')

const commentSchema = require('./comments')

const voteSchema = require('./votes')

const { Schema, model } = mongoose

const outfitsSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
		},
		img: {
			type: String,
			required: true,
		},
		rating: {
			type: String, enum: ["Hot", "Not"],
			default: "Hot"
		},
		tags: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag'
		}],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		comments: [commentSchema],
		votes: [voteSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Outfit', outfitsSchema)
