import supertest from 'supertest';
import app from '../app.js';
const api = supertest(app);
import sql from '../db.js';
import testHelper from './testHelper.js';
let cookie = null;
//POPULATE DATABASE WITH 2 USERS
beforeEach(async () => {
    await testHelper.clearTestDatabase();
    await testHelper.initializeTestDatabase();
    const user = {
        id: '3',
        password: 'testpw'
    };
    const login = await api.post('/api/auth/login/password')
        .send(user);
    cookie = login.header['set-cookie'];
});
//TESTS
//GET ROUTES
describe('GET route tests...', () => {
    //GET returns all users
    test('Returning all users', async () => {
        const result = await api
            .get('/api/users')
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(result.body).toHaveLength(3); //3 items in database only
    });
    //GET returns one user
    test('Return one user', async () => {
        const result = await api
            .get('/api/users/1') //1 is first id of auto incrementing ids of users
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(result.body.fname = 'John'); //John should be the first user in database
    });
    //GET with ID that does not exist
    test('Attempt with non-existent ID', async () => {
        await api.get('/api/users/5') //Only 2 users in database, id of 3 should not exist
            .set('Cookie', cookie)
            .expect(404);
    });
    //GET with ID that is incorrect format
    test('Attempt with invalid ID', async () => {
        await api.get('/api/users/poop')
            .set('Cookie', cookie)
            .expect(400);
    });
    //GET route without auth
    test('Attempt without cookie header set', async () => {
        const result = await api.get('/api/users');
        expect(result.header['location']).toEqual('/api/auth/login');
    });
});
//POST ROUTES
describe('POST route tests...', () => {
    //POST valid user
    test('Creating a new valid user', async () => {
        const getUsers = await sql `SELECT * FROM users;`; //GET ALL USERS (should have 3 TOTAL)
        const newUser = {
            is_admin: false,
            password: 'test',
            fname: 'New',
            lname: 'User',
            dob: new Date('1993-03-03'),
            date_employed: new Date('2003-02-03'),
            email: 'testemail@gmail.com',
            phone: '3930203321'
        };
        const addUser = await api
            .post('/api/users')
            .send(newUser)
            .set('Cookie', cookie)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        expect(addUser.body.id).toEqual('4');
        const getUsersAgain = await sql `SELECT * FROM users;`;
        expect(getUsersAgain.length).toEqual(getUsers.length + 1); //Should be 1 size bigger now
    });
    //POST invalid input
    test('Attempt to create with an invalid user object', async () => {
        const getUsers = await sql `SELECT * FROM users;`; //GET ALL USERS (should have 3 TOTAL)
        const invalidUser = {
            password: 'test',
            fname: 'No Admin or Dob',
            lname: 'Wew',
            date_employed: new Date('2003-02-03'),
            email: 'testemail@gmail.com',
            phone: '3930203321'
        };
        await api
            .post('/api/users')
            .set('Cookie', cookie)
            .send(invalidUser)
            .expect(404);
        const getUsersAgain = await sql `SELECT * FROM users;`;
        console.log(typeof getUsers.length);
        console.log(typeof getUsersAgain.length);
        expect(getUsersAgain.length).toEqual(getUsers.length); //should be same size
    });
    //POST without authentication
    test('Attempt to create with no authentication', async () => {
        const result = await api.post('/api/users')
            .send('Payload does not matter');
        expect(result.header['location']).toEqual('/api/auth/login');
    });
});
//PUT ROUTES
describe('PUT route tests...', () => {
});
//PUT with valid update and valid id
//PUT with invalid update and valid id
//PUT with valid update and invalid id
//PUT with invalid update and invalid id
//PUT user who doesn't exist
//PUT without authentication
//DELETE ROUTES
describe('DELETE route tests...', () => {
});
//DELETE with valid id
//DELETE with invalid id
//DELETE with id that doesn't exist
//DELETE without authentication
// AFTERALL CLEAR DATABASE
afterAll(async () => {
    // await testHelper.clearTestDatabase()
});
