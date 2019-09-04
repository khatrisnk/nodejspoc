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

const postDeleteProduct = (req, res, next) => {
    Product.deleteProductById(req.body.productId)
    res.redirect('/admin/products')
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