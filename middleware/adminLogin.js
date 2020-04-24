module.exports = (req, res, next) => {
    if (req.user && req.user.admin){
        next()
    } else {
        req.flash('error', 'You are not an Admin')
        res.redirect('/')
    }
}