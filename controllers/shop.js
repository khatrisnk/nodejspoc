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

const getCartPage = (req, res, next) => {
    Cart.getCart(cart => {
        Product.getProducts(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                )
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
    })
}

const postCartPage = (req, res, next) => {
    const productId = req.body.id
    const price = req.body.price
    Cart.save(productId, price)
    res.redirect('/cart')
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
    getProductDetailPage,
    postCartPage
}