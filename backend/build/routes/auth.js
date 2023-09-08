import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../database/users.js';
const authRouter = express.Router();
//Initialize strategy for passport authentication
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, id, password, done) => {
    db.getUser(id)
        .then(res => {
        // console.log('HERE')
        bcrypt.compare(password, res.password)
            .then((res) => {
            return done(null, res);
        })
            .catch(err => { return done(err); });
    })
        .catch((err) => { return done(err); });
}));
passport.serializeUser((user, next) => {
    process.nextTick(() => {
        next(null, user);
    });
});
passport.deserializeUser((user, next) => {
    process.nextTick(() => {
        return next(null, user);
    });
});
//CHANGE this to wrong login eventually
authRouter.get('/login', async (req, res, next) => {
    res.status(401).send('please login');
});
//change route to just login eventually
//login route, redirect to login if failure to authenticate otherwise redirect
authRouter.post('/login/password', passport.authenticate('local', {
    successRedirect: '/api/users',
    failureRedirect: '/api/auth/login'
}), (req, res, next) => {
});
authRouter.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/api/auth/login');
    });
});
export default authRouter;
