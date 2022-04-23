const mongoose = require('mongoose')
const Outfit = require('./outfits')
const Tag  = require('./tags')

const db = require('../../config/db')

// const starterOutfits = [
//     {
//         description: "cute versatile look for spring",
//         date: "2022-04-21",
//         img: "https://i.imgur.com/Mkcjobx.jpg",
//         rating: "Hot",
//         tags: [],
//     },
//     {
//         description: "cool look for a cool person",
//         date: "2022-04-21",
//         img: "https://i.imgur.com/vze52a7.jpg",
//         rating: "Not",
//         tags: [],
//     },
//     {
//         description: "just vibing",
//         date: "2022-04-21",
//         img: "https://i.imgur.com/mRnJtLu.jpg",
//         rating: "Hot",
//         tags: [],
//     },
// ]

const starterTags = [
	{
		type: "vintage"
	},
    {
		type: "casual"
	},
    {
		type: "grunge"
	},
    {
		type: "goth"
	},
    {
		type: "punk"
	},
    {
		type: "boho"
	},
    {
		type: "artsy"
	},
    {
		type: "date night"
	},
    {
		type: "summer look"
	},
    {
		type: "spring look"
	},
    {
		type: "fall look"
	},
    {
		type: "winter look"
	},
    {
		type: "western"
	},
    {
		type: "sexy"
	},
    {
		type: "sporty"
	},
    {
		type: "formal"
	},
    {
		type: "day"
	},
    {
		type: "evening"
	},
    
]

// first we connect to the db via mongoose
mongoose.connect(db, {
    useNewUrlParser: true,
})
    .then(() => {
        // then we remove all the places
        Tag.deleteMany({ owner: null })
            .then(deletedTags => {
                console.log('deleted tags', deletedTags)
                // then we create using the starterOutfits array
                // we'll use console logs to check if it's working or if there are errors
                Tag.create(starterTags)
                    .then(newTags => {
                        console.log('the new tags', newTags)
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // then at the end, we close our connection to the db
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })