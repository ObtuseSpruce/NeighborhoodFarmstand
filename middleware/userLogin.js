module.exports = (req, res, next) => {
    //do stuff
    if(req.user){
        //good they're logged in
        next() //proceed as planned
    }
    else {
        //bad they're not logged in
        //send them back to the login page
        req.flash('error', 'You must be logged in to view this page')
        res.redirect('/auth/login')
    }
}