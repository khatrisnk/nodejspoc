const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')
const productController = require('../controllers/products')
const router = express.Router()

router.get('/add-product', productController.geAddProductPage)
router.post('/product', productController.postProduct)

module.exports = { 
    router: router
}