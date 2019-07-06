const Product = require('../models/product')

const geAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', { pageTitle: 'Add Product', path: "/admin/add-product" })
}

const postProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

const getShopPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = Product.getProducts(products => {
        res.render('shop', {
            products: products,
            pageTitle: 'Shop',
            path: "/",
            hasProducts: products.length > 0
        })
    })
}

module.exports = {
    geAddProductPage,
    postProduct,
    getShopPage
}