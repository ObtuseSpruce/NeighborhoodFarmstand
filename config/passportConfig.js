// Require Environment variable
require('dotenv').config()

let passport = require('passport')

// Require any strategies(AKA types of Auth we want to use)
let LocalStrategy = require('passport-local').Strategy

let db = require('../models')

//Serialization and Deserialization functions
//These are for passport to use in order to store/lookup the user info
//SERIALIZE: Reduce a user object to just its id field
passport.serializeUser((user, done) => {
    //Call the callback function with the user id as an argument
    //done(error, id)- pass a null if no error
    done(null, user.id)
})


// DESERIALIZE: reverse the process of the serialize function
// in other words, take a user's ID and return the full user object
passport.deserializeUser((id, done) => {
    //Pk stands for primary-key
    db.user.findByPk(id)
    .then(user => {
        done(null, user)
    })
    .catch()
})


//LOCAL STRATEGY: using a database that we manage ourselves(not OAUTH)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    //Try looking up the user by their email
    db.user.findOne({
        where: { email: email}
    })
    .then(foundUser => {
        //check to see if there is a user
        if (foundUser && foundUser.validPassword(password)){
              console.log("found user: ", email, password)
                //good - user exists and password is correct
               console.log('good')
                done(null, foundUser)
        } else {
            console.log('bad')
            // bad - user doesn't exist
            done(null, null)
        }
    })
    .catch()
} ))

module.exports = passport