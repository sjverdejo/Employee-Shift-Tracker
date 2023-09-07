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
import db from '../database/users.js';
import authCheck from '../utils/authCheck.js';
const usersRouter = express.Router();
//GET route to return all users
usersRouter.get('/', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.getAllUsers();
    res.json(users);
}));
//GET route to return specific user
usersRouter.get('/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.getUser(req.params.id);
        res.json(user[0]);
    }
    catch (error) {
        next(error);
    }
}));
//POST route to create a new user
usersRouter.post('/', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //passed user object in request
    const user = req.body;
    try {
        const newUser = yield db.createNewUser(user);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
//PUT route to update user
usersRouter.put('/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //passed user object in request
    const user = req.body;
    try {
        yield db.updateUser(req.params.id, user);
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
}));
//DELETE route to delete user
usersRouter.delete('/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.deleteUser(req.params.id);
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
}));
export default usersRouter;
