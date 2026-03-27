
import MongoClient from 'mongodb'

/* const { MongoClient } = require('mongodb') */

let dbConnection

// Function for connecting to database
module.exports = {
    // Connecting to the database
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/testingthis')
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    // To return database connection after
    // we have connected to it
    getDb: () => dbConnection 
}