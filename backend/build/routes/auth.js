import express from 'express';
import bcrypt from 'bcrypt';
import db from '../database/users.js';
const authRouter = express.Router();
//Login Router 
authRouter.post('/login', async (req, res) => {
    const { id, password } = req.body;
    if (req.session.authenticated) {
        res.status(404).json({ message: 'Already authenticated.' });
        return;
    }
    //user login info
    const user = await db.getUser(id);
    const validPW = user === null
        ? false
        : await bcrypt.compare(password, user.password);
    //if both are valid
    if (user && validPW) {
        req.session.authenticated = true;
        res.status(200).send(req.session);
    }
    else {
        res.status(404).json({ message: 'Invalid id or password.' });
    }
});
//Check if LoggedIn Router
authRouter.get('/login', async (req, res) => {
    if (req.session.authenticated) {
        res.status(200).send({ is_signed_in: true });
    }
    else {
        res.status(403).send({ is_signed_in: false });
    }
});
//Logout Router
authRouter.post('/logout', async (req, res) => {
    if (req.session.authenticated) {
        req.session.destroy((error) => {
            if (error) {
                res.status(401).json({ message: 'Could not be logged out.' });
            }
            else {
                res.status(200).json({ message: 'Logout successful.' });
            }
        });
    }
    else {
        res.status(401).json({ message: 'Not Logged In.' });
    }
});
//Initialize strategy for passport authentication
// passport.use(new LocalStrategy({
//   usernameField: 'id',
//   passwordField: 'password',
//   passReqToCallback: true
// },
//   (req, id, password, done) => {
//     db.getUser(id)
//       .then(res => {
//         bcrypt.compare(password, res.password)
//           .then((res) => {
//             return done(null, res)
//           })
//       .catch(err => { return done(err) })
//     })
//     .catch((err) => { return done(err) })
//   }
// ))
// passport.serializeUser((user: Express.User, next) => {
//   process.nextTick(() => {
//     next(null, user)
//   })
// })
// passport.deserializeUser((user: Express.User, next) => {
//   process.nextTick(() => {
//     return next(null, user)
//   })
// })
// //CHANGE this to wrong login eventually
// authRouter.get('/login', async (req, res, next) => {
//   res.status(401).send('please login')
// })
// //change route to just login eventually
// //login route, redirect to login if failure to authenticate otherwise redirect
// authRouter.post('/login/password', passport.authenticate('local', {
//   successRedirect: '/api/users',
//   failureRedirect: '/api/auth/login'
//   }),
//   (req, res, next) => {
// })
// authRouter.post('/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) { return next(err) }
//     res.redirect('/api/auth/login')
//   })
// })
export default authRouter;
