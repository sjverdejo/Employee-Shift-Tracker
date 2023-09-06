import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy }from 'passport-local'
import bcrypt from 'bcrypt'
import db from '../database/users.js'

const authRouter = express.Router()

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, id, password, done) {
    db.getUser(id)
      .then(res => {
        console.log(res[0])
      bcrypt.compare(password, res[0].password)
      .then((res) => {
        console.log(password)
        console.log(res)
        return done(null, res)
      })
      .catch(err => { return done(err) })
    })
    .catch((err) => { console.log(err); return done(err) })
  }
))

authRouter.get('/login', async (req, res, next) => {
  res.send('200')
})

authRouter.post('/login/password', passport.authenticate('local', {
  successRedirect: '/api/users',
  failureRedirect: '/login'
  }),
  (req, res, next) => {
  })

export default authRouter