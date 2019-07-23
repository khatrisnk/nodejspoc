const path = require('path')
const fs = require('fs')
const uuidv4 = require('uuid/v4');

const rootDir = require('../utils/path')

const currentPath = path.join(rootDir, 'data', 'product.json')

const getProductsFromFile = cb => {
    fs.readFile(currentPath, (err, data) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

class Product {
    constructor(reqBody) {
        this.title = reqBody.title
        this.imageUrl = reqBody.imageUrl
        this.price = reqBody.price
        this.description = reqBody.description
    }

    save() {
        getProductsFromFile(products => {
            this.id = uuidv4()
            products.push(this)
            fs.writeFile(currentPath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    update(productId) {
        getProductsFromFile(products => {
            const updatedProducts = products.map(product => {
                if(product.id === productId) {
                    product.title = this.title
                    product.imageUrl = this.imageUrl
                    product.price = this.price
                    product.description = this.description
                }
                return product
            })
            fs.writeFile(currentPath, JSON.stringify(updatedProducts), (err) => {
                console.log(err)
            })
        })
    }

    static getProducts(cb) {
        getProductsFromFile(cb)
    }

    static getProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id)
            cb(product)
        })
    }
}

module.exports = Product