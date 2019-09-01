// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Sid@20184'
// })

// module.exports = pool.promise()

// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('node-complete', 'root', 'Sid@20184', {
//     dialect: 'mysql',
//     host: 'localhost'
// })

// module.exports = sequelize


const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://siddhartha:Sid@20184@cluster0-nximv.mongodb.net/shop?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })

const mongoConnect = callback => {
  client
    .connect()
    .then(() => {
      console.log('Connected to shop mongodb!!!')
      callback()
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  client,
  mongoConnect
}

