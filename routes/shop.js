const express = require('express')
const path  = require('path')

const rootDir = require('../utils/path')
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndexPage)
router.get('/products', shopController.getProductsPage)
router.get('/products/:productId', shopController.getProductDetailPage)
router.get('/cart', shopController.getCartPage)
router.post('/add-to-cart', shopController.postCartPage)
router.get('/orders', shopController.getOrderPage)

module.exports = {
    router: router
}