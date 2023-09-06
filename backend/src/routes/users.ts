import express from 'express'
import db from '../database/users.js'

const usersRouter = express.Router()

//GET route to return all users
usersRouter.get('/', async (req, res) => {
  const users = await db.getAllUsers()

  res.json(users)
})

//GET route to return specific user
usersRouter.get('/:id', async (req, res) => {
  const user = await db.getUser(req.params.id)

  res.json(user[0])
})

//Interface for user object type
interface userObject {
  is_admin: boolean
  password: string
  fname: string
  lname: string
  dob: Date
  date_employed: Date
  email: string
  phone: string
}

//POST route to create a new user
usersRouter.post('/', async (req, res) => {
  //passed user object in request
  const user: userObject = req.body

  const newUser = await db.createNewUser(user) 

  res.json(newUser)
})

//PUT route to update user
usersRouter.put('/:id', async (req, res) => {
  //passed user object in request
  const user: userObject = req.body

  const updatedUser = await db.updateUser(req.params.id, user)

  res.json(updatedUser)
})

//DELETE route to delete user
usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await db.deleteUser(req.params.id)

  res.json(deletedUser)
})


export default usersRouter
