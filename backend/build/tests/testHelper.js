import usersDB from '../database/users.js';
import shiftsDB from '../database/shifts.js';
import sql from '../db.js';
//Put initial values into database
const initializeTestDatabase = async () => {
    const firstUser = {
        is_admin: true,
        password: 'testpw',
        fname: 'John',
        lname: 'Cena',
        dob: new Date('1977-04-23'),
        date_employed: new Date('2022-09-22'),
        email: 'johncena@gmail.com',
        phone: '9056434424'
    };
    const secondUser = {
        is_admin: false,
        password: 'testpw',
        fname: 'Dave',
        lname: 'Bautista',
        dob: new Date('1969-01-18'),
        date_employed: new Date('2022-09-28'),
        email: 'davebautista@gmail.com',
        phone: '9052939291'
    };
    const firstShift = {
        scheduled_start: new Date(),
        scheduled_end: new Date(),
        scheduled_hours: 8
    };
    const secondShift = {
        scheduled_start: new Date(),
        scheduled_end: new Date(),
        scheduled_hours: 8
    };
    const thirdShift = {
        scheduled_start: new Date(),
        scheduled_end: new Date(),
        scheduled_hours: 8
    };
    const firstId = await usersDB.createNewUser(firstUser);
    const secondId = await usersDB.createNewUser(secondUser);
    await shiftsDB.createShift(firstId.id, firstShift);
    await shiftsDB.createShift(secondId.id, secondShift);
    await shiftsDB.createShift(secondId.id, thirdShift);
};
const clearTestDatabase = async () => {
    await sql `TRUNCATE shifts, users RESTART IDENTITY CASCADE`;
};
export default { initializeTestDatabase, clearTestDatabase };
