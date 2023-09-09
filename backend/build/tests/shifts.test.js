import supertest from 'supertest';
import app from '../app.js';
const api = supertest(app);
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
    const login = await api.post('/api/auth/login/password')
        .send(user);
    cookie = login.header['set-cookie'];
});
//GET shifts 
describe('GET routes for shifts', () => {
    //Get all shifts
    test('Get all shifts', async () => {
        const result = await api
            .get('/api/shifts')
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(result.body[0].scheduled_hours).toEqual(8); //first shift in database has value 8
    });
    //Get shift with valid id
    test('Get one shift with valid id', async () => {
        const result = await api
            .get('/api/shifts/1') //valid id since 1 is first shift in db
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(result.body.scheduled_hours).toEqual(8);
    });
    //Get shift with invalid id
    test('Get shift with an invalid id like incorrect format', async () => {
        await api
            .get('/api/shifts/string')
            .set('Cookie', cookie)
            .expect(400);
    });
    //Get shift with non existent id
    test('Get shift with an id that does not exist', async () => {
        await api
            .get('/api/shifts/5') // only 3 shifts in db
            .set('Cookie', cookie)
            .expect(400);
    });
    //Get shifts for employee with valid employee id
    test('Get shifts for employee with valid id', async () => {
        const result = await api
            .get('/api/shifts/employee/2')
            .set('Cookie', cookie)
            .expect(200);
        expect(result.body.length).toEqual(2); //Size of array for this employee should be 2 since 2 shifts belong to this id
    });
    //Get shifts for employee with invalid employee id
    test('Get shifts for employee with invalid id', async () => {
        await api
            .get('/api/shifts/5') // only 3 shifts in db
            .set('Cookie', cookie)
            .expect(400);
    });
    //Get shifts for employee with non existent employee id
    test('Get shifts for employee that does not exist', async () => {
        await api
            .get('/api/shifts/employee/5') // only 3 shifts in db
            .set('Cookie', cookie)
            .expect(400);
    });
    //Get shifts without authentication
    test('Get shifts without authentication', async () => {
        const result = await api
            .get('/api/shifts/3'); // only 3 shifts in db
        expect(result.header['location']).toEqual('/api/auth/login');
    });
});
//POST shifts
describe('POST routes for shifts', () => {
    //Post new valid shift with valid id
    //Post new invalid shift with valid id
    //Post new valid shift with invalid id
    //Post new invalid shift with valid id
    //Post new valid shift with non existent id
    //Post new shift without authentication
});
//PUT shifts
describe('UPDATE routes for shifts', () => {
    //Update with valid shift and valid id
    //Update with valid shift and invalid id
    //Update with valid shift and non existent id
    //Update with invalid shift and valid id
    //Update with invalid shift and invalid id
    //Update with invalid shift and non existent id
    //Update without authentication
});
//DELETE shifts
describe('DELETE routes for shifts', () => {
    //Delete with valid id
    //Delete with invalid id
    //Delete with non existent id
});
// AFTERALL CLEAR DATABASE
afterAll(async () => {
    await testHelper.clearTestDatabase();
});
