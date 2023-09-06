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
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, id, password, done) {
    db.getUser(id)
        .then(res => {
        console.log(res[0]);
        bcrypt.compare(password, res[0].password)
            .then((res) => {
            console.log(password);
            console.log(res);
            return done(null, res);
        })
            .catch(err => { return done(err); });
    })
        .catch((err) => { console.log(err); return done(err); });
}));
authRouter.get('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('200');
}));
authRouter.post('/login/password', passport.authenticate('local', {
    successRedirect: '/api/users',
    failureRedirect: '/login'
}), (req, res, next) => {
});
export default authRouter;
