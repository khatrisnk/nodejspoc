const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')
const adminController = require('../controllers/admin')
const isAuth = require('../middlewares/auth')
const router = express.Router()

router.get('/add-product', isAuth, adminController.getAddProductPage)
router.get('/edit-product/:productId', isAuth, adminController.getEditProductPage)
router.post('/product', isAuth, adminController.postProduct)
router.post('/edit-product', isAuth, adminController.editProduct)
router.get('/products', isAuth, adminController.getProductsPage)
router.post('/delete-product', isAuth, adminController.postDeleteProduct)

module.exports = { 
    router: router
}