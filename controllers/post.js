let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')

router.use(userLogin)

router.get('/new', (req, res) =>{
    res.render('post/new')
})

router.get('/show', (req, res) =>{
    db.post.findAll({
        include: [db.user]
    })
    .then( post => {
        res.render('post/show', { post })
    })
})

router.post('/new', (req, res) => {
    console.log(req.body)
    db.post.create({
        userId: req.body.userId,
        offer: req.body.offer,
        trade: req.body.trade,
        postContent: req.body.postContent,
        zip: req.body.zip
    })
    .then(() => {
        res.redirect('/')
    })
})

router.delete('/:id', (req, res) => {
    db.post.destroy({
      where: { id: req.params.id },
      })
      .then(() => {
        res.redirect('/post/show')
      })
      .catch((err) => {
        console.log('delete error', err)
        res.render('error')
      })
  })

  router.get('/:id/edit', (req, res) => {
    db.post.findOne({
        where: {id: req.params.id},
    })
    .then((post) => {
        res.render('post/edit', { post })
    })
    .catch(err => {
    console.log(err)
    res.render('error')
    })
})

  router.put('/:id', (req, res) => {
    console.log("this is the request", req.body)
    db.post.update(
        req.body,
        { where : { id: req.params.id}}
    )
    .then(() => {
        res.redirect('/post/show')
    })
    .catch(err => {
        console.log('Error in delete route', err)
        res.render('error')
    })
})

module.exports = router