// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for outfits
const Outfit = require('../models/comments')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existent document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// POST -> to create a comment
router.post('/:outfitId', (req, res) => {
    const outfitId = req.params.outfitId
    console.log('first comment body', req.body)
    
    // we'll adjust req.body to include an author
    // the author's id will be the logged in user's id
    req.body.author = req.session.userId
    console.log('updated comment body', req.body)
    // we'll find the game with the gameId
   Outfit.findById(outfitId)
        .then(outfit => {
            // then we'll send req.body to the comments array
            outfit.comments.push(req.body)
            // save the game
            return outfit.save()
        })
        .then(outfit => {
            // redirectS
            res.redirect(`/outfits/${outfit.id}`)
        })
        // or show an error if we have one
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

router.delete('/:id', (req, res) => {
	// get the game id
	const outfitId = req.params.id
	// delete the game
	Outfit.findByIdAndRemove(outfitId)
		.then((game) => {
			console.log('this is the response', outfit)
			res.redirect('/outfits')
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

module.exports = app