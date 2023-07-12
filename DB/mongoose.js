const mongoose = require('mongoose')

const dbStr = process.env.DB_CONNECTION_STR.replace('<password>', process.env.DB_PASSWORD)

const connectDB = ()=>{
    return mongoose.connect(dbStr)
}

module.exports = connectDB