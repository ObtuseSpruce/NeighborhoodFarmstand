let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')
//custom middleware that is ONLY applied to the routes in this file

router.use(userLogin)

//get route for normies
router.get('/user', (req, res) => {
    res.render('profile/user', { moment })
})

// get  /profile/guest/userId - viewing a user's profile as a guest
router.get('/guest/:id', (req, res) => {
    db.user.findByPk(req.params.id)
    .then(userProfile => {
        res.render('profile/guest', { moment, userProfile})
    })
    .catch(err => {
        res.render('error', err)
    })
})


//get route for admin profiles
router.get('/admin', adminLogin, (req, res) => {
    db.user.findAll()
    .then(users => {
        res.render('profile/admin', { moment, users })
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router