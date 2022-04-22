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
			type: String, enum: ["Hot", "Not"]
		},
		tags: [ {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tags'
		} ],
		comments: [ {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comments'
		} ],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		comments: [commentSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Outfit', outfitsSchema)
