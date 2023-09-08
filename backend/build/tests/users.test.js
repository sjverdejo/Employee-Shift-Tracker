import supertest from 'supertest';
import app from '../app.js';
const api = supertest(app);
import testHelper from './testHelper.js';
//POPULATE DATABASE WITH 2 USERS
beforeEach(async () => {
    await testHelper.initializeTestDatabase();
});
//TESTS
//GET ROUTES
//GET returns all users
describe('GET route tests...', () => {
    // test('Returning all users', async () => {
    //   const result = await api
    //     .get('/api/users')
    //     .expect(200)
    //     .expect('Content-Type', /application\/json/)
    //   expect(result.body).toHaveLength(2)
    // })
    test('Return one user', async () => {
        const allUsers = await api.get('/api/users');
        console.log(allUsers.body[0].id);
    });
});
//GET returns one user
//GET with invalid ID
//POST ROUTES
//POST valid user
//POST invalid input
//UPDATE ROUTES
//UPDATE with valid update and valid id
//UPDATE with invalid update and valid id
//UPDATE with valid update and invalid id
//UPDATE with invalid update and invalid id
//DELETE ROUTES
//DELETE with valid id
//DELETE with invalid id
// AFTERALL CLEAR DATABASE
afterAll(async () => {
    await testHelper.clearTestDatabase();
});
