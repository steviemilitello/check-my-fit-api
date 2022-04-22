const mongoose = require('mongoose')
const Outfit = require('./outfits')

const db = require('../../config/db')

const starterOutfits = [
    {
        description: "cute versatile look for spring",
        date: "2022-04-21",
        img: "https://i.imgur.com/Mkcjobx.jpg",
        rating: "Hot",
        tags: [],
    },
    {
        description: "cool look for a cool person",
        date: "2022-04-21",
        img: "https://i.imgur.com/vze52a7.jpg",
        rating: "Not",
        tags: [],
    },
    {
        description: "just vibing",
        date: "2022-04-21",
        img: "https://i.imgur.com/mRnJtLu.jpg",
        rating: "Hot",
        tags: [],
    },
]

// first we connect to the db via mongoose
mongoose.connect(db, {
    useNewUrlParser: true,
})
    .then(() => {
        // then we remove all the places
        Outfit.deleteMany({ owner: null })
            .then(deletedOutfits => {
                console.log('deleted outfits', deletedOutfits)
                // then we create using the starterOutfits array
                // we'll use console logs to check if it's working or if there are errors
                Outfit.create(starterOutfits)
                    .then(newOutfits => {
                        console.log('the new outfits', newOutfits)
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