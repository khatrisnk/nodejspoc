const express = require('express')
const path  = require('path')

const rootDir = require('../utils/path')
const adminRoutes = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('shop', {
        products: adminRoutes.products,
        pageTitle: 'Shop',
        path: "/",
        hasProducts: adminRoutes.products.length > 0
    })
})

module.exports = router