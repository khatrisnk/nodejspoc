const mongodb = require('mongodb')
const database = require('../utils/database')

class Users {
    constructor(name, email, cart, id) {
        this.name = name
        this.email = email
        this.cart = cart || { items: []}
        this._id = id
    }

    save() {
        return database.getDb().collection('users').insertOne(this)
    }

    addOrder() {
        return this.getCart()
            .then(products => {
                return database
                    .getDb()
                    .collection('orders')
                    .insertOne({
                        items: products,
                        user: {
                            _id: this._id,
                            name: this.name
                        }
                    })
            })
            .then(() => {
                this.cart = { items: [] }
                return database
                    .getDb()
                    .collection('users')
                    .updateOne(
                        { _id: new mongodb.ObjectID(this._id) },
                        { $set: { cart: this.cart } }
                    )
            })
    }

    getOrders() {
        return database
            .getDb()
            .collection('orders')
            .find({ 'user._id': this._id })
            .toArray()
    }

    deleteCartItem(productId) {
        const updatedCart = this.cart.items.filter(item => {
            return item.productId.toString() !== productId
        })
        return database
            .getDb()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectID(this._id) },
                { $set: { cart: { items: updatedCart } } }
            )
    }

    getCart() {
        const cartItems = [...this.cart.items]
        const productIds = cartItems.map(item => {
            return item.productId
        })
        return database
            .getDb()
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(product => {
                    return {
                        ...product,
                        quantity: cartItems.find(item => {
                            return item.productId.toString() === product._id.toString()
                        }).quantity
                    }
                })
            })
    }

    addToCart(productId) {
        // Find index if product already exists in cart
        const productIndexInCart = this.cart.items.findIndex(cartItem => {
            return cartItem.productId.toString() === productId
        })
        const cartItems = [...this.cart.items]

        if (productIndexInCart >= 0) {
            cartItems[productIndexInCart].quantity = cartItems[productIndexInCart].quantity + 1
        } else {
            cartItems.push({ productId: new mongodb.ObjectID(productId), quantity: 1 })
        }
        const updatedCart = { items: cartItems }
        return database
            .getDb()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectID(this._id) },
                { $set: { cart: updatedCart } }
            )
    }

    static findById(userId) {
        return database.getDb().collection('users').findOne({ _id: new mongodb.ObjectID(userId)})
    }
}

module.exports = Users