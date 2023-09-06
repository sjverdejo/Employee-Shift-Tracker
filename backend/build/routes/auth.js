var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        bcrypt.compare(password, res[0].password)
            .then((res) => {
            return done(null, res);
        })
            .catch(err => { return done(err); });
    })
        .catch((err) => { return done(err); });
}));
passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});
authRouter.get('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('please login');
}));
//login route, redirect to login if failure to authenticate otherwise redirect
authRouter.post('/login/password', passport.authenticate('local', {
    successRedirect: '/api/users',
    failureRedirect: '/auth/login'
}), (req, res, next) => {
});
authRouter.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});
export default authRouter;
