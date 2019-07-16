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
        this.id = uuidv4()
        this.title = reqBody.title
        this.imageUrl = reqBody.imageUrl
        this.price = reqBody.price
        this.description = reqBody.description
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(currentPath, JSON.stringify(products), (err) => {
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