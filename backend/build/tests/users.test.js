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
    //login to database and set authentication
    const login = await api.post('/api/auth/login')
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
        const count_before = await sql `SELECT * FROM users;`; //GET ALL USERS (should have 3 TOTAL)
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
        const count_after = await sql `SELECT * FROM users;`;
        expect(count_after.length).toEqual(count_before.length + 1); //Should be 1 size bigger now
    });
    //POST invalid input
    test('Attempt to create with an invalid user object', async () => {
        const count_before = await sql `SELECT * FROM users;`; //GET ALL USERS (should have 3 TOTAL)
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
        const count_after = await sql `SELECT * FROM users;`;
        expect(count_after.length).toEqual(count_before.length); //should be same size
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
    const valid_update = {
        is_admin: true,
        password: 'testpw',
        fname: 'Johnathon',
        lname: 'Cena',
        dob: new Date('1977-04-23'),
        date_employed: new Date('2022-09-22'),
        email: 'johnathoncena@gmail.com',
        phone: '9056434424'
    };
    //missing fname
    const invalid_update = {
        is_admin: true,
        password: 'testpw',
        lname: 'Cena',
        dob: new Date('1977-04-23'),
        date_employed: new Date('2022-09-22'),
        email: 'johnathoncena@gmail.com',
        phone: '9056434424'
    };
    //PUT with valid update and valid id
    test('Updating with valid id and user', async () => {
        await api.put('/api/users/1') //modify first id (John Cena)
            .set('Cookie', cookie)
            .send(valid_update) //Update name and email
            .expect(204);
        const update = await sql `SELECT fname, email FROM users where id = 1;`; //check user
        expect(update[0].fname).toContain('Johnathon'); //check if name updated
        expect(update[0].email).toContain('johnathoncena@gmail.com'); //check if email updated
    });
    //PUT with invalid update and valid id
    test('Updating with invalid update user and valid id', async () => {
        await api.put('/api/users/1')
            .set('Cookie', cookie)
            .send(invalid_update) //invalid user
            .expect(400);
    });
    //PUT with valid update and invalid id
    test('Updating with valid update user and invalid id', async () => {
        await api.put('/api/users/words') //invalid id
            .set('Cookie', cookie)
            .send(valid_update)
            .expect(400);
    });
    //PUT with invalid update and invalid id
    test('Updating with invalid update user and invalid id', async () => {
        await api.put('/api/users/words') //invalid id
            .set('Cookie', cookie)
            .send(invalid_update) //invalid user
            .expect(400);
    });
    //PUT with user who doesn't exist
    test('Updating with user id that does not exist', async () => {
        await api.put('/api/users/5') //only 3 inside users database
            .set('Cookie', cookie)
            .send(valid_update)
            .expect(400);
    });
    //PUT without authentication
    test('Updating with no authentication', async () => {
        const result = await api.put('/api/users/2')
            .send('Payload does not matter');
        expect(result.header['location']).toEqual('/api/auth/login');
    });
});
//DELETE ROUTES
describe('DELETE route tests...', () => {
    //DELETE with valid id
    test('Deleting a user with valid id', async () => {
        const count_before = await sql `SELECT * FROM users;`;
        await api.delete('/api/users/1')
            .set('Cookie', cookie)
            .expect(204);
        const count_after = await sql `SELECT * FROM users;`;
        expect(count_after.length).toEqual(count_before.length - 1);
    });
    //DELETE with invalid id
    test('Attempt to delete with invalid id', async () => {
        await api.delete('/api/users/string') //id should be valid format
            .set('Cookie', cookie)
            .expect(400);
    });
    //DELETE with id that doesn't exist
    test('Attempt to delete with an id that is out of range', async () => {
        await api.delete('/api/users/5') //5 should not exist
            .set('Cookie', cookie)
            .expect(400);
    });
    //DELETE without authentication
    test('Deleting without authentication', async () => {
        const result = await api.delete('/api/users/2')
            .send('Payload does not matter');
        expect(result.header['location']).toEqual('/api/auth/login');
    });
});
// AFTERALL CLEAR DATABASE
afterAll(async () => {
    await testHelper.clearTestDatabase();
});
