const mongoose = require('mongoose')

const User = require('./outfits')

const commentSchema = require('./comments')

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
		hotVotes: {
			type: Number,
			default: 0
		},
		notVotes: {
			type: Number,
			default: 0
		},
		tags: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag'
		}],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Outfit', outfitsSchema)
