const express = require('express')
const path  = require('path')

const rootDir = require('../utils/path')
const shopController = require('../controllers/shop')
const isAuth = require('../middlewares/auth')

const router = express.Router()

router.get('/', shopController.getIndexPage)
router.get('/products', shopController.getProductsPage)
router.get('/products/:productId', shopController.getProductDetailPage)
router.get('/cart', isAuth, shopController.getCartPage)
router.post('/add-to-cart', isAuth, shopController.postCartPage)
router.post('/cart-delete-item', isAuth, shopController.postDeleteCartItem)
router.post('/create-order', isAuth, shopController.postCreateOrder)
router.get('/orders', isAuth, shopController.getOrderPage)

module.exports = {
    router: router
}