const mongoose = require('mongoose')
const Outfit = require('./outfits')
const Tag = require('./tags')

const db = require('../../config/db')
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb')

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

// const starterTags = [
//   {
//     category: "vintage"
//   },
//   {
//     category: "casual"
//   },
//   {
//     category: "grunge"
//   },
//   {
//     category: "goth"
//   },
//   {
//     category: "punk"
//   },
//   {
//     category: "boho"
//   },
//   {
//     category: "artsy"
//   },
//   {
//     category: "date night"
//   },
//   {
//     category: "summer look"
//   },
//   {
//     category: "spring look"
//   },
//   {
//     category: "fall look"
//   },
//   {
//     category: "winter look"
//   },
//   {
//     category: "western"
//   },
//   {
//     category: "sexy"
//   },
//   {
//     category: "sporty"
//   },
//   {
//     category: "formal"
//   },
//   {
//     category: "day"
//   },
//   {
//     category: "evening"
//   },

// ]

// first we connect to the db via mongoose
mongoose.connect(db, {
  useNewUrlParser: true,
})
.then(() => {
  // then we remove all the places
  Outfit.deleteMany({ owner: null })
    .then(deletedOutfits => {
      console.log('deleted Outfits', deletedOutfits)
      // then we create using the startPets array
      // we'll use console logs to check if it's working or if there are errors
      Outfit.create(starterOutfits)
        .then(newOutfits => {
          console.log('the new Outfits', newOutfits)
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

// //SEED for TAGS
// mongoose.connect(db, {
//   useNewUrlParser: true,
// })
//   .then(() => {
//     // then we remove all the places
//     Tag.deleteMany({ owner: null })
//       .then(deletedTags => {
//         console.log('deleted tags', deletedTags)
//         // then we create using the starterOutfits array
//         // we'll use console logs to check if it's working or if there are errors
//         Tag.create(starterTags)
//           .then(newTags => {
//             console.log('the new tags', newTags)
//             mongoose.connection.close()
//           })
//           .catch(err => {
//             console.log(err)
//             mongoose.connection.close()
//           })
//       })
//       .catch(error => {
//         console.log(error)
//         mongoose.connection.close()
//       })
//   })
//   // then at the end, we close our connection to the db
//   .catch(error => {
//     console.log(error)
//     mongoose.connection.close()
//   })