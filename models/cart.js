const path = require('path')
const fs = require('fs')
const rootDir = require('../utils/path')

const currentPath = path.join(rootDir, 'data', 'cart.json')

const getCartFromFile = cb => {
    fs.readFile(currentPath, (err, data) => {
        if (err) {
            cb({
                products: [],
                totalPrice: 0
            })
        } else {
            cb(JSON.parse(data))
        }
    })
}
class Cart {
    static save(productId, price) {
        getCartFromFile(cart => {
            const { products, totalPrice } = cart
            // check if product already exist
            const productIndex = products.findIndex(product => {
                return product.id === productId
            })
            const existingProduct = products[productIndex]
            const isProductExist = productIndex !== -1
            let updatedProduct
            if(isProductExist) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [ ...products ]
                cart.products[productIndex] = updatedProduct
            } else {
                updatedProduct = { qty: 1, id: productId }
                cart.products = [ ...products, updatedProduct]
            }
            cart.totalPrice = totalPrice + Number(price)
            fs.writeFile(currentPath, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }
}

module.exports = Cart