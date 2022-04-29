// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Outfit = require('../models/outfits')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

// POST -> to create a vote
router.post('/vote/:outfitId', requireToken, (req, res) => {

    const outfitId = req.params.outfitId

    req.body.vote.voter = req.user._id

    console.log('updated comment body', req.body)

    // we'll find the outfit with the outfitId
    Outfit.findById(outfitId)

        .then(outfit => {
            // then we'll send req.body to the comments array
            outfit.votes.push(req.body.vote.vote)
            // save the outfit
            return res.status(200).json({ outfit: outfit.toObject() })
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

module.exports = router