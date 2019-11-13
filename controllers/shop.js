const Product = require('../models/product')
const Order = require('../models/order')

const getIndexPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    Product
        .find()
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
        .find()
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
        .removeFromCart(req.body.productId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

const getCartPage = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: user.cart.items
            })
        })
        .catch(err => console.log(err))
}

const postCartPage = (req, res, next) => {
    const productId = req.body.id
    Product.findById(productId)
        .then(product => {
            req.user
                .addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

const postCreateOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

const getOrderPage = (req, res, next) => {
    Order
        .find()
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