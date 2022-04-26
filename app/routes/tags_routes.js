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
// router.get('/tags/:id', (req, res, next) => {
//     // req.params.id will be set based on the `:id` in the route
//     Tag.findById(req.params.id)
//         .then(handle404)
//         // if `findById` is succesful, respond with 200 and "outfit" JSON
//         .then((tag) => res.status(200).json({ tag: tag.toObject() }))
//         // if an error occurs, pass it to the handler
//         .catch(next)
// })

// SHOW
// GET /tags/vintage
router.get('/tags/vintage', async (req, res, next) => {

    const tag = await Tag.find({ category: 'vintage' }).populate('outfits')

    // console.log(tag[0].outfits)

    res.status(200).json({ outfits: tag[0].outfits })

})
// SHOW
// GET /tags/causal
router.get('/tags/casual', async (req, res, next) => {

    const tag = await Tag.find({ category: 'casual' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/grunge
router.get('/tags/grunge', async (req, res, next) => {

    const tag = await Tag.find({ category: 'grunge' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/goth
router.get('/tags/goth', async (req, res, next) => {

    const tag = await Tag.find({ category: 'goth' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/punk
router.get('/tags/punk', async (req, res, next) => {

    const tag = await Tag.find({ category: 'punk' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/boho
router.get('/tags/boho', async (req, res, next) => {

    const tag = await Tag.find({ category: 'boho' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/artsy
router.get('/tags/artsy', async (req, res, next) => {

    const tag = await Tag.find({ category: 'artsy' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})


// SHOW
// GET /tags/datenight
router.get('/tags/datenight', async (req, res, next) => {

    const tag = await Tag.find({ category: 'date night' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/summerlook
router.get('/tags/summerlook', async (req, res, next) => {

    const tag = await Tag.find({ category: 'summer look' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/springlook
router.get('/tags/springlook', async (req, res, next) => {

    const tag = await Tag.find({ category: 'spring look' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/falllook
router.get('/tags/falllook', async (req, res, next) => {

    const tag = await Tag.find({ category: 'fall look' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/winterlook
router.get('/tags/winterlook', async (req, res, next) => {

    const tag = await Tag.find({ category: 'winter look' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/western
router.get('/tags/western', async (req, res, next) => {

    const tag = await Tag.find({ category: 'western' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})


// SHOW
// GET /tags/sexy
router.get('/tags/sexy', async (req, res, next) => {

    const tag = await Tag.find({ category: 'sexy' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/sporty
router.get('/tags/sporty', async (req, res, next) => {

    const tag = await Tag.find({ category: 'sporty' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/formal
router.get('/tags/formal', async (req, res, next) => {

    const tag = await Tag.find({ category: 'formal' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/day
router.get('/tags/day', async (req, res, next) => {

    const tag = await Tag.find({ category: 'day' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

})

// SHOW
// GET /tags/evening
router.get('/tags/evening', async (req, res, next) => {

    const tag = await Tag.find({ category: 'evening' }).populate('outfits')

    res.status(200).json({ outfits: tag[0].outfits })

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