const mongoose = require('mongoose')
const Outfit = require('./outfits')
const Tag = require('./tags')

const db = require('../../config/db')

// const starterOutfits = [
//   {
//     description: "cute versatile look for spring",
//     date: "2022-04-21",
//     img: "https://i.imgur.com/Mkcjobx.jpg",
//     rating: "Hot",
//     tags: [],
//   },
//   {
//     description: "cool look for a cool person",
//     date: "2022-04-21",
//     img: "https://i.imgur.com/vze52a7.jpg",
//     rating: "Not",
//     tags: [],
//   },
//   {
//     description: "just vibing",
//     date: "2022-04-21",
//     img: "https://i.imgur.com/mRnJtLu.jpg",
//     rating: "Hot",
//     tags: [],
//   },
// ]

const starterTags = [
  {
    _id: "62684388d744f0c94e08d96e",
    category: "vintage"
  },
  {
    _id: "626843f81efda0f78eee013a",
    category: "casual"
  },
  {
    _id: "62684405179727689c5b7bdd",
    category: "grunge"
  },
  {
    _id: "6268440ffcbff9a62fb559a3",
    category: "goth"
  },
  {
    _id: "6268441b060587e9f3589ace",
    category: "punk"
  },
  {
    _id: "62684427588649b61b91f60b",
    category: "boho"
  },
  {
    _id: "626844321c439ec9ab7d59c5",
    category: "artsy"
  },
  {
    _id: "6268443d39595b809ff5dc7d",
    category: "date night"
  },
  {
    _id: "62684447bd34ccc6f4221138",
    category: "summer look"
  },
  {
    _id: "62684451d7b7b8aa38d05671",
    category: "spring look"
  },
  {
    _id: "6268445ca44cc53ee2ece044",
    category: "fall look"
  },
  {
    _id: "626844651e599f9ff7444bb4",
    category: "winter look"
  },
  {
    _id: "62684471019f634d3b1e1a4f",
    category: "western"
  },
  {
    _id: "6268447bb36a69c922752027",
    category: "sexy"
  },
  {
    _id: "62684485991d04bd06a118e5",
    category: "sporty"
  },
  {
    _id: "6268448f05a59aec41654998",
    category: "formal"
  },
  {
    _id: "6268449877bf11746bedf4e5",
    category: "day"
  },
  {
    _id: "626844a16c8d870164be1820",
    category: "evening"
  },

]

// // first we connect to the db via mongoose
// mongoose.connect(db, {
//   useNewUrlParser: true,
// })
// .then(() => {
//   // then we remove all the places
//   Outfit.deleteMany({ owner: null })
//     .then(deletedOutfits => {
//       console.log('deleted Outfits', deletedOutfits)
//       // then we create using the startPets array
//       // we'll use console logs to check if it's working or if there are errors
//       Outfit.create(starterOutfits)
//         .then(newOutfits => {
//           console.log('the new Outfits', newOutfits)
//           mongoose.connection.close()
//         })
//         .catch(err => {
//           console.log(err)
//           mongoose.connection.close()
//         })
//     })
//     .catch(error => {
//       console.log(error)
//       mongoose.connection.close()
//     })
// })
// // then at the end, we close our connection to the db
// .catch(error => {
//   console.log(error)
//   mongoose.connection.close()
// })

//SEED for TAGS
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