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

// let _db;
// const MongoClient = require('mongodb').MongoClient;
// let uri = "mongodb+srv://siddhartha:sid1234@cluster0-nximv.mongodb.net/shop?retryWrites=true&w=majority";
// uri = 'mongodb://localhost/shop'
// const client = new MongoClient(uri, { useNewUrlParser: true });

// const mongoConnect = callback => {
//   client.connect(err => {
//     // perform actions on the collection object
//     if(!err) {
//       console.log('connected to mongo db!!!')
//       _db = client.db()
//       callback()
//     } else {
//       console.log('Mongodb connection Error: ', err)
//     }
//   });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

const mongoose = require('mongoose')
const uri = 'mongodb://localhost/shop'

const mongoConnect = callback => {
  mongoose.connect(uri)
    .then(() => {
      callback()
    })
    .catch(err => console.log(err))
};

exports.mongoConnect = mongoConnect;
