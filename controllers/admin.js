const Product = require('../models/product')

const getAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', { pageTitle: 'Add Product', path: "/admin/add-product" })
}

const getEditProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    const editMode = req.query.edit
    if(editMode === 'true') {
        Product.getProductById(req.params.productId, product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: "/admin/edit-product",
                product
            })
        })
    } else {
        res.redirect('/')
    }
    
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

const editProduct = (req, res, next) => {
    const reqBody = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }
    const product = new Product(reqBody)
    product.update(req.body.productId)
    res.redirect('/admin/products')
}

const getProductsPage = (req, res, next) => {
    const products = Product.getProducts(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: "/admin/products",
            hasProducts: products.length > 0
        })
    })
}

module.exports = {
    getAddProductPage,
    postProduct,
    getProductsPage,
    getEditProductPage,
    editProduct
}