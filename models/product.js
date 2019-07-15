const path = require('path')
const fs = require('fs')

const rootDir = require('../utils/path')

const currentPath = path.join(rootDir, 'data', 'product.json')

class Product {
    constructor(reqBody) {
        this.title = reqBody.title
        this.imageUrl = reqBody.imageUrl
        this.price = reqBody.price
        this.description = reqBody.description
    }

    save() {
        let products = []
        fs.readFile(currentPath, (err, data) => {
            if (err) {
                products = []
            } else {
                products = JSON.parse(data)
            }
            products.push(this)
            fs.writeFile(currentPath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
        products.push(this)
    }

    static getProducts(cb) {
        fs.readFile(currentPath, (err, data) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(data))
            }
        })
    }
}

module.exports = Product