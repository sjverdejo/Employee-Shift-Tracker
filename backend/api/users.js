const usersRouter = require('express').Router()
const db = require('../sql/users')

usersRouter.get('/', async (req, res) => {
  const users = await db.getAllUsers()

  res.send(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await db.getUser(req.params.id)

  res.send(user)
})

module.exports = usersRouter
