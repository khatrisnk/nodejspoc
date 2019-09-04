const database = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }

  save() {
    const db = database.getDb()
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        return result
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
