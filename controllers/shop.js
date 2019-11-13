const Product = require('../models/product')
const Cart = require('../models/cart')

const getIndexPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: "/",
                hasProducts: products.length > 0
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const getProductsPage = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: "/products",
                hasProducts: products.length > 0
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const getProductDetailPage = (req, res, next) => {
    const productId = req.params.productId
    Product
        .findById(productId)
        .then(product => {
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: 'Product Detail',
                product
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const postDeleteCartItem = (req, res, next) => {
    req.user
        .deleteCartItem(req.body.productId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

const getCartPage = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(err => console.log(err))
}

const postCartPage = (req, res, next) => {
    const productId = req.body.id
    req.user
        .addToCart(productId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

const postCreateOrder = (req, res, next) => {
    req.user   
        .addOrder()
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

const getOrderPage = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                pageTitle: 'orders',
                path: "/orders",
                orders
            })
        })
}

module.exports = {
    getIndexPage,
    getProductsPage,
    getCartPage,
    getProductDetailPage,
    postCartPage,
    postDeleteCartItem,
    postCreateOrder,
    getOrderPage
}