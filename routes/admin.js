const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')
const adminController = require('../controllers/admin')
const router = express.Router()

router.get('/add-product', adminController.getAddProductPage)
router.get('/edit-product/:productId', adminController.getEditProductPage)
router.post('/product', adminController.postProduct)
router.post('/edit-product', adminController.editProduct)
router.get('/products', adminController.getProductsPage)
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = { 
    router: router
}