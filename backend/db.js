const postgres = require('postgres')
const config = require('./config')

const connectionString = config.DATABASE_URL
const sql = postgres(connectionString)

module.exports = sql