const bcrypt = require('bcryptjs')
const Users = require('../models/users')

exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login'
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    Users
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.redirect('/login')
            }
            bcrypt
                .compare(password, user.password)
                .then(isPwdMatched => {
                    if (!isPwdMatched) {
                        return res.redirect('/login')
                    }
                    // Just keeping a reference of a user to request object
                    req.session.user = user
                    req.session.isLoggedIn = true
                    req.session.save(() => {
                        res.redirect('/')
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login')
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getSignUpPage = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'signup',
        isAuthenticated: false
    })
}

exports.postSignUp = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // Mot required for now till validation
    const confirmPassword = req.body.confirmPassword

    Users.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.redirect('/signup')
            }
            return bcrypt
                .hash(password, 12)
                .then(hashPassword => {
                    const newUser = new Users({
                        name,
                        email,
                        password: hashPassword,
                        cart: { items: [] }
                    })
                    return newUser.save()
                })
                .then(() => {
                    res.redirect('/login')
                })
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}