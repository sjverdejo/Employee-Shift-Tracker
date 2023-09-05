var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sql from '../db.js';
//Return all users in database
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield sql `select * from users;`;
    return users;
});
//Return one user with matching ID
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield sql `select * from users where id = ${id};`;
    return user;
});
//Create a new user using provided user object
const createNewUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield sql `insert into users (isAdmin, password, fName, lName, dob, dateEmployed, email, phone)
    VALUES (${newUser.isAdmin}, ${newUser.password}, ${newUser.fName}, ${newUser.lName}, ${newUser.dob}, ${newUser.dateEmployed}, ${newUser.email}, ${newUser.phone});`;
    return user;
});
export default { getAllUsers, getUser, createNewUser };
