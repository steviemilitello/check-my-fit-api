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
const user = require('../models/user')
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
		.populate('owner')
		.populate('tags')
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

// INDEX 
// GET /outfits/user/:userId
router.get('/outfits/user/:userId', async (req, res, next) => {
	const userId = req.params.userId
	// indexing outfits specific to a user for a profile page
	Outfit.find({ 'owner': userId })
		.populate('owner')
		.populate('tags')
		.then((outfits) => {

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
		.populate('owner')
		.populate('tags')
		.populate('comments')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "outfit" JSON
		.then((outfit) => {

			return res.status(200).json({ outfit: outfit.toObject() })
		})
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
	console.log(outfit)
	// first, we'll make a new outfit
	const newOutfit = await Outfit.create(outfit);
	// console.log("newOutfit._id", newOutfit._id)
	// then, we'll update any tags associated with the outfit to show it's relationship to the outfit
	await Tag.updateMany({ '_id': newOutfit.tags }, { $push: { outfits: newOutfit._id } })
	return res.send(newOutfit)

})

// UPDATE *with PUT route*
// PUT outfits/5a7db6c74d55bc51bdf3979
router.put('/outfits/:id', requireToken, removeBlanks, async (req, res) => {
	const _id = req.params.id
	const { outfit } = req.body
	// set an an array of newTags if a tag is added
	const newTags = outfit.tags || [];

	// find outfit by id before edit
	const oldOutfit = await Outfit.findOne({ _id });
	const oldTags = oldOutfit.tags;

	// assign modified body to new outfit
	Object.assign(oldOutfit, outfit)
	const newOutfit = await oldOutfit.save()

	// filter throught the array of new/old tags to detect additions/removal
	const added = newTags.filter(x => oldTags.indexOf(x) === -1)
	const removed = oldTags.filter(x => newTags.indexOf(x) === -1)

	// update the tags associated with the outfit to remove/add the outfit id
	await Tag.updateMany({ '_id': added }, { $push: { outfits: newOutfit._id } })

	await Tag.updateMany({ '_id': removed }, { $pull: { outfits: newOutfit._id } })

	return res.send(newOutfit)
})


// DESTROY
// DELETE /outfits/5a7db6c74d55bc51bdf39793
router.delete('/outfits/:id', requireToken, async (req, res, next) => {
	const _id = req.params.id
	const outfit = await Outfit.findOne({ _id })
	// first, find the outfit by id and remove it
	await outfit.remove()
	// then, pull the outfit id with any associated tags
	await Tag.updateMany({ '_id': outfit.tags }, { $pull: { outfits: outfit._id } })

		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
