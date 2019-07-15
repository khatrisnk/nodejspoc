const Product = require('../models/product')

const geAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', { pageTitle: 'Add Product', path: "/admin/add-product" })
}

const postProduct = (req, res, next) => {
    const reqBody = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }
    const product = new Product(reqBody)
    product.save()
    res.redirect('/')
}

const getProductsPage = (req, res, next) => {
    const products = Product.getProducts(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: "admin/products",
            hasProducts: products.length > 0
        })
    })
}

module.exports = {
    geAddProductPage,
    postProduct,
    getProductsPage
}