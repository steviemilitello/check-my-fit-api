const express = require('express')

const passport = require('passport')

// pull in Mongoose model for outfits
const Outfit = require('../models/outfits')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// POST -> to create a comment

router.post('/comments/:outfitId', requireToken, (req, res) => {

    const outfitId = req.params.outfitId

    // we'll adjust req.body to include an author
    // the author's id will be the logged in user's id
    req.body.comment.author = req.user._id
    console.log('updated comment body', req.body)

    // we'll find the outfit with the outfitId
    Outfit.findById(outfitId)

        .then(outfit => {
            // then we'll send req.body to the comments array
            outfit.comments.push(req.body.comment)
            // save the outfit
            return outfit.save()
        })
        .then(() => res.sendStatus(204))
        // or show an error if we have one
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

// DELETE -> to delete a comment
router.delete('/comments/:outfitId/:commId', requireToken, (req, res) => {

    // first we want to parse out our ids
    const outfitId = req.params.outfitId
    const commId = req.params.commId
    // then we'll find the outfit
    Outfit.findById(outfitId)
        .then(outfit => {
            const theComment = outfit.comments.id(commId)
            // only delete the comment if the user who is logged in is the comment's author
            if (theComment.author == req.user.id) {
                // then we'll delete the comment
                theComment.remove()
                // return the saved game
                return outfit.save()
            } else {
                return
            }
        })
        .then(() => res.sendStatus(204))
        .catch(error => {
            // catch any errors
            console.log(error)
            res.send(error)
        })
})

module.exports = router