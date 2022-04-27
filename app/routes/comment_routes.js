
const express = require('express')

const passport = require('passport')

const Outfit = require('../models/outfits')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// POST -> to create a comment
router.post('comments/:outfitId', requireToken, (req, res) => {
    console.log("***********HITTTTT COMMENT ROUTEE********")
    const outfitId = req.params.outfitId
    console.log('first comment body', req.body)

    // we'll adjust req.body to include an author
    // the author's id will be the logged in user's id
    req.body.comment.author = req.user.id
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
            // redirect
            res.redirect(`/outfits/${outfit.id}`)
        })
        // or show an error if we have one
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

// DELETE -> to delete a comment
router.delete('comments/:outfitId/:commId', (req, res) => {
    // first we want to parse out our ids
    const outfitId = req.params.outfitId
    const commId = req.params.commId
    // then we'll find the game
    Outfit.findById(outfitId)
        .then(outfit => {
            const theComment = outfit.comments.id(commId)
            // only delete the comment if the user who is logged in is the comment's author
            if (theComment.author == req.user.id) {
                // then we'll delete the comment
                theComment.remove()
                // return the saved game
                return game.save()
            } else {
                return
            }

        })
        .then(outfit => {
            // redirect to the game show page
            res.redirect(`/outfits/${outfitId}`)
        })
        .catch(error => {
            // catch any errors
            console.log(error)
            res.send(error)
        })
})

module.exports = router