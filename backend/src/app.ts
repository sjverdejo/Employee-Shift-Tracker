import express from 'express'
const app = express()
import config from './utils/config.js'
import passport from 'passport'
import session from 'express-session'
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js' 

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

export default app