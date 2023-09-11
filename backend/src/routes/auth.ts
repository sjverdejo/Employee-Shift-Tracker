import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/users.js'

declare module 'express-session' {
  interface Session {
    authenticated: boolean,
    is_admin: boolean,
    e_ID: string
  }
}

const authRouter = express.Router()

//Login Router 
authRouter.post('/login', async (req, res) => {
  const { employeeId, password } = req.body

  if (req.session.authenticated) {
    res.status(404).json({ message: 'Already authenticated.' })
    return
  }

  //user login info
  const user = await db.getUser(employeeId)
  
  let validPW = false

  if (user) {
    validPW = await bcrypt.compare(password, user.password)
  }
  
  
  //if both are valid
  if (user && validPW) {
    req.session.authenticated = true
    req.session.is_admin = user.is_admin
    req.session.e_ID = user.id
    res.status(200).send(req.session)
  } else {
    res.status(404).send({ message: 'Invalid id or password.' })
    return
  }
})

//Check if LoggedIn Router
authRouter.get('/logged_in', async (req, res) => {
  if (req.session.authenticated) {
    res.json({is_signed_in: true, user: req.session})
  } else {
    res.json({is_signed_in: false})
  }
})

//Logout Router
authRouter.post('/logout', async (req, res) => {
  if (req.session.authenticated) {
    req.session.destroy((error) => {
      if (error) {
        res.status(401).json({ message: 'Could not be logged out.' })
      } else {
        res.status(200).json({ message: 'Logout successful.' })
      }
    })
  } else {
    res.status(401).json({ message: 'Not Logged In.' })
  }
})

export default authRouter