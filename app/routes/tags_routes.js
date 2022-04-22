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

// DELETE -> delete a tag
// DELETE /outfits/tag/<outfit_id>
router.delete('/delete/:outfitId/:tagId', requireToken, (req, res, next) => {
    const tagId = req.params.tagId
    const outfitId = req.params.outfitId

    Outfit.updateOne({ _id: outfitId }, { $pull: { tags: tagId } }, function (err, outfit) {

        // .then(outfit => {
        //     const theTag = outfit.tags.map(tagId)
        //     // console.log("theTag", outfit.tags.map(tagId))
        //     requireOwnership(req, outfit)
        //     theTag.remove()
        //     // return the saved fruit
        //     return outfit.save()
        // })
        // // send 204 no content
        console.log("outfit", outfit)
    })

})





module.exports = router