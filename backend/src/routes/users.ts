import express from 'express'
import db from '../database/users.js'

const usersRouter = express.Router()

//GET route to return all users
usersRouter.get('/', async (req, res) => {
  const users = await db.getAllUsers()

  res.send(users)
})

//GET route to return specific user
usersRouter.get('/:id', async (req, res) => {
  const user = await db.getUser(req.params.id)

  res.send(user)
})

export default usersRouter
