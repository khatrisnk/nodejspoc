const Users = require('../models/users')

exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {
    Users
        .findById('5dcc577ddab5e07f1d64ea62')
        .then(user => {
            // Just keeping a reference of a user to request object
            req.session.user = user
            req.session.isLoggedIn = true
            req.session.save(() => {
                res.redirect('/')
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}