const Product = require('../models/product')

const getAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        isAuthenticated: req.session.isLoggedIn
    })
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
                product,
                isAuthenticated: req.session.isLoggedIn
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
        .findByIdAndRemove(req.body.productId)
        .then(result => {
            console.log('Product deleted successfully!!!')
            //req.user.deleteCartItem(req.body.productId)
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const postProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.user
    })
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
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            product.save()
        })
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
        .find({ userId: req.user._id})
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: "/admin/products",
                hasProducts: products.length > 0,
                isAuthenticated: req.session.isLoggedIn
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