const mongodb = require('mongodb')
const database = require('../utils/database')

class Users {
    constructor(name, email) {
        this.name = name
        this.email = email
    }

    save() {
        return database.getDb().collection('users').insertOne(this)
    }

    static findById(userId) {
        return database.getDb().collection('users').findOne({ _id: new mongodb.ObjectID(userId)})
    }
}

module.exports = Users