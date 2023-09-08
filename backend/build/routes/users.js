import express from 'express';
import db from '../database/users.js';
import authCheck from '../utils/authCheck.js';
import helper from '../utils/helper.js';
const usersRouter = express.Router();
//GET route to return all users
usersRouter.get('/', authCheck, async (req, res, next) => {
    const users = await db.getAllUsers();
    res.status(200).json(users);
});
//GET route to return specific user
usersRouter.get('/:id', authCheck, async (req, res, next) => {
    try {
        const user = await db.getUser(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).end();
        }
    }
    catch (error) {
        next(error);
    }
});
//POST route to create a new user
usersRouter.post('/', authCheck, async (req, res, next) => {
    //passed user object in request
    // const { is_admin, password, fname, lname, dob, date_employed, email, phone } = req.body
    const user = req.body;
    if (helper.validUser(user)) {
        try {
            const newUser = await db.createNewUser(user);
            res.status(201).json(newUser);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        res.status(404).end();
    }
});
//PUT route to update user
usersRouter.put('/:id', authCheck, async (req, res, next) => {
    //passed user object in request
    const user = req.body;
    if (helper.validUser(user)) {
        try {
            const id = await db.updateUser(req.params.id, user);
            if (id[0]) {
                res.status(204).send();
            }
            else {
                res.status(400).end();
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        res.status(400).end();
    }
});
//DELETE route to delete user
usersRouter.delete('/:id', authCheck, async (req, res, next) => {
    try {
        const id = await db.deleteUser(req.params.id);
        if (id[0]) {
            res.status(204).send();
        }
        else {
            res.status(400).end();
        }
    }
    catch (error) {
        next(error);
    }
});
export default usersRouter;
