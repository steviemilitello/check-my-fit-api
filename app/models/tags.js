const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
		},
		outfits: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Outfit'
		}],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Tag', tagsSchema)