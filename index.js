//********************************
//    NODE MODULES
//********************************
//require needed modules
require('dotenv').config()
let express = require('express')
//add layouts
let flash = require('connect-flash')
let session = require('express-session')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')
let axios = require('axios')
//create an app instance
let db = require('./models')
let app = express()

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN})

//include Passport
let passport = require('./config/passportConfig')

//********************************
//    SETTINGS / MIDDLEWARE
//********************************

//set template lang to ejs
app.set('view engine', 'ejs')

//tell express to use layouts
app.use(layouts)

// set up a static folder
app.use(express.static('static'))

app.use(methodOverride('_method'))

//decrypt POST route data (from forms etc)
app.use(express.urlencoded({ extended: false }))

//Setting up session for use in flash
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//passport needs to come after Session.
app.use(passport.initialize())
app.use(passport.session())

//set up connect-flash for the flash alert messages (depends on session, order matters here!!!)
app.use(flash())

//custom middleware for flash to exist on every page
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.user = req.user
    next()
})

//********************************
//           ROUTES
//********************************
//controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/post', require('./controllers/post'))
app.use('/search', require('./controllers/search'))


//home page
app.get('/', (req, res) => {
    db.post.findAll({
        include: [db.user]
    })
    .then((post) => {
        res.render('home', { post, mapkey: process.env.MAPBOX_TOKEN })
    })
    .catch(err =>{
        console.log(err)
    })
})

//create a wildcard (catch-all) route
//this will catch everything. Think like a 404 error page.
//this NEEDS to be last
app.get('*', (req, res) => {
    res.render('error')
})


//********************************
//    listener
//********************************
//pick a port to listen on
app.listen(process.env.PORT || 3000)