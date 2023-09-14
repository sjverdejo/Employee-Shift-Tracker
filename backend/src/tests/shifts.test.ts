import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

import sql from '../db.js'
import testHelper from './testHelper.js'

interface loginInfo {
  employeeId: string,
  password: string
}

interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

let cookie: any = null

//POPULATE DATABASE WITH 2 USERS
beforeEach(async () => {
  await testHelper.clearTestDatabase()
  await testHelper.initializeTestDatabase()

  const user: loginInfo = {
    employeeId: '3',
    password: 'testpw'
  }

  //login to database and set authentication
  const login = await api.post('/api/auth/login')
    .send(user)

  cookie = login.header['set-cookie']
})

//GET shifts 
describe('GET routes for shifts', () => {
  //Get all shifts
  test('Get all shifts', async () => {
    const result = await api
      .get('/api/shifts')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body[0].scheduled_hours).toEqual(8) //first shift in database has value 8
    expect(result.body.length).toEqual(3)
  })

  //Get shift with valid id
  test('Get one shift with valid id', async () => {
    const result = await api
      .get('/api/shifts/1') //valid id since 1 is first shift in db
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.scheduled_hours).toEqual(8)
  })

  //Get shift with invalid id
  test('Get shift with an invalid id like incorrect format', async () => {
    await api
      .get('/api/shifts/string')
      .set('Cookie', cookie)
      .expect(400)
  })

  //Get shift with non existent id
  test('Get shift with an id that does not exist', async () => {
    await api
      .get('/api/shifts/5') // only 3 shifts in db
      .set('Cookie', cookie)
      .expect(400)
  })

  //Get shifts for employee with valid employee id
  test('Get shifts for employee with valid id', async () => {
    const result = await api
      .get('/api/shifts/employee/2')
      .set('Cookie', cookie)
      .expect(200)

    expect(result.body.length).toEqual(2) //Size of array for this employee should be 2 since 2 shifts belong to this id
  })

  //Get shifts for employee with invalid employee id
  test('Get shifts for employee with invalid id', async () => {
    await api
      .get('/api/shifts/5') // only 3 shifts in db
      .set('Cookie', cookie)
      .expect(400)
  })

  //Get shifts without authentication
  test('Get shifts without authentication', async () => {
    const result = await api
      .get('/api/shifts/3') //Payload does not matter

    expect(result.header['location']).toEqual('/api/auth/login')
  })

})

//POST shifts
describe('POST routes for shifts', () => {
  const valid_post: shiftObj = {
    scheduled_start: new Date(),
    scheduled_end: new Date(),
    scheduled_hours: 10
  }

  const invalid_post: shiftObj = {
    scheduled_start: new Date('20002-002-02'),
    scheduled_end: new Date(),
    scheduled_hours: 0
  }

  const valid_id = 1;
  const invalid_id = 'Five';

  //Post new valid shift with valid id
  test('Post valid shift, valid id', async () => {
    const before_post = await sql`SELECT * FROM shifts;`

    await api.post(`/api/shifts/employee/${valid_id}`)
      .set('Cookie', cookie)
      .send(valid_post)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const after_post = await sql`SELECT * FROM shifts;`

    expect(after_post.length).toEqual(before_post.length + 1)
  })

  //Post new invalid shift with valid id
  test('Post invalid shift, valid id', async () => {
    await api.post(`/api/shifts/employee/${valid_id}`)
      .set('Cookie', cookie)
      .send(invalid_post)
      .expect(400)
  })

  //Post new valid shift with invalid id
  test('Post valid shift, invalid id', async () => {
    await api.post(`/api/shifts/employee/${invalid_id}`)
      .set('Cookie', cookie)
      .send(valid_post)
      .expect(400)
  })

  //Post new valid shift with non existent id
  test('Post valid shift, non existent id', async () => {
    await api.post(`/api/shifts/employee/8`)
      .set('Cookie', cookie)
      .send(valid_post)
      .expect(400)
  })

  //Post new shift without authentication
  test('Post valid shift, no auth', async () => {
    const result = await api
      .post('/api/shifts/employee/3') //Payload does not matter

    expect(result.header['location']).toEqual('/api/auth/login')
  })
})

//PUT shifts
describe('UPDATE routes for shifts', () => {
  const valid_update: shiftObj = {
    scheduled_start: new Date(),
    scheduled_end: new Date(),
    scheduled_hours: 10
  }

  const invalid_update: shiftObj = {
    scheduled_start: new Date('20002-002-02'),
    scheduled_end: new Date(),
    scheduled_hours: 0
  }

  const valid_id = 1;
  const invalid_id = 'Five';

  //Update with valid shift and valid id
  test('Update with valid shift and valid id', async () => {
    const before_update = await sql`SELECT scheduled_hours FROM shifts WHERE id=${valid_id};` //Schedule_hours should be 8

    await api.put(`/api/shifts/${valid_id}`) //Update first shift in db
      .set('Cookie', cookie)
      .send(valid_update)
      .expect(204)

    const after_update = await sql`SELECT scheduled_hours FROM shifts WHERE id=${valid_id};` //Schedule_hours should be 10 after change
    expect(after_update[0].scheduled_hours).toEqual(before_update[0].scheduled_hours + 2) //Should have gone from 8 hours before to 10 after
  })

  //Update with valid shift and invalid id
  test('Update with valid shift, invalid id', async () => {
    await api.put(`/api/shifts/${invalid_id}`)
      .set('Cookie', cookie)
      .send(valid_update)
      .expect(400)
  })

  //Update with valid shift and non existent id
  test('Update with valid shift, non existent id', async () => {
    await api.put(`/api/shifts/9`) //only 3 shifts in the database, 9 does not exist
      .set('Cookie', cookie)
      .send(valid_update)
      .expect(400)
  })

  //Update with invalid shift and valid id
  test('Update with invalid shift, valid id', async () => {
    await api.put(`/api/shifts/${valid_id}`)
      .set('Cookie', cookie)
      .send(invalid_update)
      .expect(400)
  })

  //Update without authentication
  test('Update with no auth', async () => {
    const result = await api
      .put('/api/shifts/3') //Payload does not matter

    expect(result.header['location']).toEqual('/api/auth/login')
  })

  //Update clockin // valid/invalid/nonexistent id + valid/invalid date
  test('Clock in with valid date, valid id', async () => {
    const clock_in = {
      in_time: new Date('2002-02-03')
    }

    await api.put(`/api/shifts/clockin/${valid_id}`)
      .set('Cookie', cookie)
      .send(clock_in)
      .expect(204)

    const after_update = await sql`SELECT clock_in FROM shifts WHERE id = ${valid_id}` //Get clock_in value after

    expect(after_update[0].clock_in).not.toBeNull() //clock in will have default null value before update
  })

  test('Clock in with valid date, invalid id', async () => {
    await api.put(`/api/shifts/clockin/${invalid_id}`)
      .set('Cookie', cookie)
      .send(new Date('2002-02-03'))
      .expect(400)
  })

  test('Clock in with invalid date, valid id', async () => {
    await api.put(`/api/shifts/clockin/${valid_id}`)
      .set('Cookie', cookie)
      .send(new Date('String'))
      .expect(400)
  })

  test('Clock in with valid date, nonexistent id', async () => {
    await api.put(`/api/shifts/clockin/9`) //9 does not exist
      .set('Cookie', cookie)
      .send(new Date('2002-02-03'))
      .expect(400)
  })

  //Update clockout // valid/invalid id + valid/invalid date
  test('Clock out with valid date, valid id', async () => {
    const clock_out = {
      out_time: new Date('2002-02-03')
    }

    await api.put(`/api/shifts/clockout/${valid_id}`)
      .set('Cookie', cookie)
      .send(clock_out)
      .expect(204)

    const after_update = await sql`SELECT clock_out FROM shifts WHERE id = ${valid_id}` //Get clock_in value after

    expect(after_update[0].clock_out).not.toBeNull() //clock out will have default null value 
  })

  test('Clock out with valid date, invalid id', async () => {
    await api.put(`/api/shifts/clockout/${invalid_id}`)
      .set('Cookie', cookie)
      .send(new Date('2002-02-03'))
      .expect(400)
  })

  test('Clock out with invalid date, valid id', async () => {
    await api.put(`/api/shifts/clockout/${valid_id}`)
      .set('Cookie', cookie)
      .send(new Date('String'))
      .expect(400)
  })

  test('Clock out with valid date, nonexistent id', async () => {
    await api.put(`/api/shifts/clockout/9`) //9 does not exist
      .set('Cookie', cookie)
      .send(new Date('2002-02-03'))
      .expect(400)
  })
})

//DELETE shifts
describe('DELETE routes for shifts', () => {
  //Delete with valid id
  test('Delete with valid id', async () => {
    const before_delete = await sql`SELECT * FROM shifts;` //Should contain 3 total shifts

    await api.delete('/api/shifts/1')
      .set('Cookie', cookie)
      .expect(204)

    const after_delete = await sql`SELECT * FROM shifts;`

    expect(after_delete.length).toEqual(before_delete.length - 1)
  })

  //Delete with invalid id
  test('Delete with invalid id', async () => {
    await api.delete('/api/shifts/string')
      .set('Cookie', cookie)
      .expect(400)
  })

  //Delete with non existent id
  test('Delete with id that does not exist', async () => {
    await api.delete('/api/shifts/9') //3 shifts in db, 9 does not exist
      .set('Cookie', cookie)
      .expect(400)
  })

  //Delete without authentication
  test('Delete with no auth', async () => {
    const result = await api
      .delete('/api/shifts/3') //payload does not matter

    expect(result.header['location']).toEqual('/api/auth/login')
  })
})

// AFTERALL CLEAR DATABASE
afterAll(async () => {
  await testHelper.clearTestDatabase()
})