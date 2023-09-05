const express = require('express')
const app = express()
const usersRouter = require('./api/users')

app.use('/api', usersRouter)

module.exports = app