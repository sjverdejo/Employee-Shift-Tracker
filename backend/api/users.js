const usersRouter = require('express').Router()
const db = require('../sql/users')

//GET routes
//GET all users - should be authenticated and admin role only
usersRouter.get('/', async (req, res) => {
  const users = await db.getAllUsers()

  res.send(users)
})

//GET individual user - should be authenticated and able to access only own
usersRouter.get('/:id', async (req, res) => {
  const user = await db.getUser(req.params.id)

  res.send(user)
})

module.exports = usersRouter
