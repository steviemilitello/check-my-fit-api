// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for outfits
const Outfit = require('../models/outfits')
const Tag = require('../models/tags')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
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

// INDEX
// GET /outfits
router.get('/outfits', (req, res, next) => {
	Outfit.find()
		.then((outfits) => {
			// `outfits` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return outfits.map((outfits) => outfits.toObject())
		})
		// respond with status 200 and JSON of the outfits
		.then((outfits) => res.status(200).json({ outfits: outfits }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /outfits/5a7db6c74d55bc51bdf39793
router.get('/outfits/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Outfit.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "outfit" JSON
		.then((outfit) => res.status(200).json({ outfit: outfit.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /outfits
router.post('/outfits', requireToken, async (req, res, next) => {
	// set owner of new outfit to be current user
	req.body.outfit.owner = req.user.id
	// set filled in fields to the body of the outfit
	const { outfit } = req.body
	// first, we'll make a new outfit
	const newOutfit = await Outfit.create(outfit);
	// then, we'll update any tags associated with the outfit to show it's relationship to the outfit
	await Tag.updateMany({ '_id': newOutfit.tags }, { $push: { outfits: newOutfit._id } })
	return res.send(newOutfit)

})


// UPDATE
// PATCH /outfits/5a7db6c74d55bc51bdf39793
router.patch('/outfits/:id', requireToken, removeBlanks, (req, res, next) => {


	Outfit.findById(req.params.id)
		.then(handle404)
		.then((outfit) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, outfit)

			// pass the result of Mongoose's `.update` to the next `.then`
			return outfit.updateOne(req.body.outfit)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /outfits/5a7db6c74d55bc51bdf39793
router.delete('/outfits/:id', requireToken, async (req, res, next) => {
	const _id = req.params.id
	const outfit = await Outfit.findOne({ _id })

	await outfit.remove()

	await Tag.updateMany({ '_id': outfit.tags }, { $pull: { outfits: outfit._id } })
		// Outfit.findById(req.params.id)
		// 	.then(handle404)
		// 	.then((outfit) => {
		// 		// throw an error if current user doesn't own `outfit`
		// 		requireOwnership(req, outfit)
		// 		// delete the outfit ONLY IF the above didn't throw
		// 		outfit.deleteOne()
		// 	})
		// 	// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
