import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

import testHelper from './testHelper.js'

let cookie: any = null

interface loginInfo {
  id: string,
  password: string
}

//POPULATE DATABASE WITH 2 USERS
beforeEach(async () => {
  await testHelper.clearTestDatabase()
  await testHelper.initializeTestDatabase()

  const user: loginInfo = {
    id: '3',
    password: 'testpw'
  }

  const login = await api.post('/api/auth/login/password')
    .send(user)

  cookie = login.header['set-cookie']
  // console.log(login.header)
})

//TESTS
//GET ROUTES
//GET returns all users
describe('GET route tests...', () => {
  test('Returning all users', async () => {
    const result = await api
      .get('/api/users')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveLength(3) //3 items in database only
  })

  //GET returns one user
  test('Return one user', async () => {
    const result = await api
      .get('/api/users/1') //1 is first id of auto incrementing ids of users
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.fname = 'John') //John should be the first user in database
  })

  //GET with ID that does not exist
  test('Attempt with non-existent ID', async () => {
    await api.get('/api/users/5')//Only 2 users in database, id of 3 should not exist
      .set('Cookie', cookie)
      .expect(404)
  })

  //GET with ID that is incorrect format
  test('Attempt with invalid ID', async () => {
    await api.get('/api/users/poop')
      .set('Cookie', cookie)
      .expect(400)
  })

  //GET route without auth
  test('Attempt without cookie header set', async () => {
    await api.get('/api/users')
      .expect(400)
  })
})




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
  // await testHelper.clearTestDatabase()
})