import express from 'express';
import bcrypt from 'bcrypt';
import db from '../database/users.js';
const authRouter = express.Router();
//Login Router 
authRouter.post('/login', async (req, res) => {
    const { employeeId, password } = req.body;
    if (req.session.authenticated) {
        res.status(404).json({ message: 'Already authenticated.' });
        return;
    }
    //user login info
    const user = await db.getUser(employeeId);
    const validPW = user === null
        ? false
        : await bcrypt.compare(password, user.password);
    //if both are valid
    if (user && validPW) {
        req.session.authenticated = true;
        req.session.is_admin = user.is_admin;
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
export default authRouter;
