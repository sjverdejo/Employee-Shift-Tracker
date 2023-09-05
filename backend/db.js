const postgres = require('postgres')
const config = require('./config')

//Connect to managed Postgres database
const connectionString = config.DATABASE_URL
const sql = postgres(connectionString)

module.exports = sql