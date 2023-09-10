import express from 'express'
const app = express()
import config from './utils/config.js'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'

import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import shiftsRouter from './routes/shifts.js' 
import middleware from './utils/middleware.js'

app.use(cors())

app.use(session({
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 900000 } 
}))

app.use(passport.authenticate('session')
)

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/shifts', shiftsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app