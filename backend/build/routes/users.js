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
const usersRouter = express.Router();
//GET route to return all users
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.getAllUsers();
    res.json(users);
}));
//GET route to return specific user
usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.getUser(req.params.id);
    res.json(user);
}));
//POST route to create a new user
usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passed user object in request
    const user = req.body;
    const newUser = yield db.createNewUser(user);
    res.json(newUser);
}));
usersRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passed user object in request
    const user = req.body;
    const updatedUser = yield db.updateUser(req.params.id, user);
    res.json(updatedUser);
}));
usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield db.deleteUser(req.params.id);
    res.json(deletedUser);
}));
export default usersRouter;
