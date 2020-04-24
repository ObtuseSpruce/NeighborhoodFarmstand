// Node/modules/Variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

// Routers
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// Post /auth/login - this is a place for the login form to post to
router.post('/login', passport.authenticate('local', { 
    successFlash: "successful login - welcome back",
    successRedirect: "/profile/user",
    failureFlash: "invalid credentials",
    failureRedirect: "/auth/login"
 }))

//goes to the signup page
router.get('/signup', (req, res) => {
    res.render('auth/signup', {data: {} })
})

//adds the signup form to the database
router.post('/signup', (req, res, next) => {
    console.log(req.body)
    if(req.body.password !== req.body.password_verify || req.body.password == false){
        req.flash('error', 'Passwords do not match')
        res.render('auth/signup', {data: req.body, alerts: req.flash() })
    } else {
        //passwords match, now find/create by the user's email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if(wasCreated) {
                //new user
                // TODO Auto-Login
                passport.authenticate('local', { 
                    successFlash: "successful login - Welcome!",
                    successRedirect: "/profile/user",
                    failureFlash: "invalid credentials",
                    failureRedirect: "/auth/login"
                 })(req, res, next)
            } else {
                // user already found, redirect to login page
                req.flash('error', 'account already exists')
                res.redirect('/auth/login')
            }
        })

        //check for sequelize validation errors
        .catch(err => {
            console.log('error captain error', err)
            if (err.errors) {
                err.errors.forEach(e => {
                    if (e.type == 'Validation error')
                        req.flash('error', e.message)
                })
                //Put the user back onto the signup form to try again
                res.render('auth/signup', {data: req.body, alerts: req.flash() })
            }
            else {
                //generic message for any other issue
                req.flash('error', 'server error')
                //redirect back to signup
                res.redirect('/auth/signup')
            }

        })
    }
})

router.get('/logout', (req, res) => {
    // Remove user data from the session
    req.logout()
    // tell them goodbye and redirect to home page
    req.flash('success', 'Bye Bye 👋')
    res.redirect('/')
})

// Export
module.exports = router