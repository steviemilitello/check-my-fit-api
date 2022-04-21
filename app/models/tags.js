const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Tag', tagsSchema)