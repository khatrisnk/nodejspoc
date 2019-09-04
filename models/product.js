const mongodb = require('mongodb')
const database = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl, productId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this.productId = productId ? new mongodb.ObjectID(productId) : null
  }

  save() {
    const productCollection = database.getDb().collection('products')
    let dbOp
    if (this.productId) {
      dbOp = productCollection.updateOne({ _id: this.productId }, { $set: this })
    } else {
      dbOp = productCollection.insertOne(this)
    }
    return dbOp
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = database.getDb()
    return db
      .collection('products')
      .deleteOne({_id: new mongodb.ObjectID(prodId)})
      .then(product => {
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = database.getDb()
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectID(prodId)})
      .next()
      .then(product => {
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = database.getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Product
