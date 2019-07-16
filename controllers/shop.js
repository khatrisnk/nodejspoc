const Product = require('../models/product')

const getIndexPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = Product.getProducts(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: "/",
            hasProducts: products.length > 0
        })
    })
}

const getProductsPage = (req, res, next) => {
    const products = Product.getProducts(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: "/products",
            hasProducts: products.length > 0
        })
    })
}

const getProductDetailPage = (req, res, next) => {
    const productId = req.params.productId
    Product.getProductById(productId, product => {
        res.render('shop/product-detail', {
            path: '/products',
            pageTitle: 'Product Detail',
            product
        })
    })
}

const getCartPage = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'cart',
        path: "/cart",
    })
}

const getOrderPage = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'orders',
        path: "/orders",
    })
}

module.exports = {
    getIndexPage,
    getProductsPage,
    getCartPage,
    getOrderPage,
    getProductDetailPage
}