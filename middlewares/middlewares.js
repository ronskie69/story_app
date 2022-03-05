module.exports.checkAuth = (req, res, next) => {
    console.log(req.session)
    if(!req.session.email && !req.session.isAuth) {
        req.session.isAuth = false
        return next()
    }
    return res.redirect('/mystory/story')
}