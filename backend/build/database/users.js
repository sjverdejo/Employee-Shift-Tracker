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
import bcrypt from 'bcrypt';
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
    //Hash the password so not stored directly to database
    const saltRounds = 10;
    const passwordHash = yield bcrypt.hash(newUser.password, saltRounds);
    const user = yield sql `insert into users (is_admin, password, fname, lname, dob, date_employed, email, phone)
    VALUES (${newUser.is_admin}, ${passwordHash}, ${newUser.fname}, ${newUser.lname}, ${newUser.dob}, ${newUser.date_employed}, ${newUser.email}, ${newUser.phone});`;
    return user;
});
export default { getAllUsers, getUser, createNewUser };
