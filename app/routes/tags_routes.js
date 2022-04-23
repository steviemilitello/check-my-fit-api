// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Outfit = require('../models/outfits')
const Tag = require('../models/tags')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

// ROUTES GO HERE

// INDEX
// GET /tags
router.get('/tags', (req, res, next) => {
    Tag.find()
        .then((tags) => {
            // `outfits` will be an array of Mongoose documents
            // we want to convert each one to a POJO, so we use `.map` to
            // apply `.toObject` to each one
            return tags.map((tags) => tags.toObject())
        })
        // respond with status 200 and JSON of the tags
        .then((tags) => res.status(200).json({ tags: tags }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// SHOW
// GET /tags/5a7db6c74d55bc51bdf39793
router.get('/tags/:id', (req, res, next) => {
    // req.params.id will be set based on the `:id` in the route
    Tag.findById(req.params.id)
        .then(handle404)
        // if `findById` is succesful, respond with 200 and "outfit" JSON
        .then((tag) => res.status(200).json({ tag: tagId.toObject() }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// POST -> create a tag
// POST /outfits/tag/<outfit_id>
router.post('/tags/:outfitId', requireToken, removeBlanks, (req, res, next) => {

    const tag = req.body.tag
    const outfitId = req.params.outfitId

    Outfit.findById(outfitId)
        .then(outfit => {
            console.log('this is outfit', outfit);
            Tag.create(tag)
                .then((tag) => {
                    console.log('this was returned from create', tag)

                    outfit.tags.push(tag)
                    outfit.save()
                    res.status(201).json({ tag: tag.toObject() })
                })

        })
})

// is delete needed?
// DELETE -> delete a tag
// DELETE /outfits/tag/<outfit_id>
router.delete('/delete/:outfitId/:tagId', requireToken, async (req, res, next) => {
    const tagId = req.params.tagId
    const outfitId = req.params.outfitId

    const tag = await Tag.findOne({ tagId })

    await tag.remove()

    await Outfit.updateMany({ 'tagId': tag.outfits }, { $pull: { tags: tag._id } })

        // await Outfit.updateOne({ _id: outfitId }, { $pull: { tags: tagId } }, function (err, outfit) {

        // })
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

module.exports = router