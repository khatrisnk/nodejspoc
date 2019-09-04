const Product = require('../models/product')

const getAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', { pageTitle: 'Add Product', path: "/admin/add-product" })
}

const getEditProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    const editMode = req.query.edit
    if(editMode === 'true') {
        Product
        .findById(req.params.productId)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: "/admin/edit-product",
                product
            })
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        res.redirect('/')
    }
    
}

const postDeleteProduct = (req, res, next) => {
    Product
        .deleteById(req.body.productId)
        .then(result => {
            console.log('Product deleted successfully!!!')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const postProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl
    )
    product
        .save()
        .then(result => {
            console.log('Product created successfully!!!')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const editProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        req.body.productId
    )
    product
        .save()
        .then(result => {
            console.log('Product updated successfully!!!')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const getProductsPage = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: "/admin/products",
                hasProducts: products.length > 0
            })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getAddProductPage,
    postProduct,
    getProductsPage,
    getEditProductPage,
    editProduct,
    postDeleteProduct
}