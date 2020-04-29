let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let axios = require('axios')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN})
const zipcodePull = process.env.ZIPCODE_KEY

router.get('/', (req, res) => {
    geocodingClient.forwardGeocode({
        types: ['postcode'],
        query: `${req.query.zip}`
    })
    .send()
    .then( response => {
        console.log(response)
        let match = response.body.features[0]
        let query = response.body.query
        console.log(query)
        db.post.findAll({
            include: [db.user]
        })
        .then(post => {
            let zipcode = req.query.zip
            const zipURL = 'https://www.zipcodeapi.com/rest/' + zipcodePull + '/radius.json/' + zipcode + '/5/miles?minimal'
            axios.get(zipURL).then( function(apiResponse) {
                let zipRes = apiResponse.data;
                res.render('search/show', { query, match, mapkey: process.env.MAPBOX_TOKEN, post, zipRes  })
            })
            // res.send(match)
        })
        // console.log(match.features[0].center)
        // res.send(match)
    })
})

module.exports = router