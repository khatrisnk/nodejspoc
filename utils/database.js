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

let _db;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://siddhartha:sid1234@cluster0-nximv.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const mongoConnect = callback => {
  client.connect(err => {
    // perform actions on the collection object
    if(!err) {
      console.log('connected to mongo db!!!')
      _db = client.db()
      callback()
    }
    console.log(err)
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


