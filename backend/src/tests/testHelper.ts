import bcrypt from 'bcrypt'
import usersDB from '../database/users.js'
import shiftsDB from '../database/shifts.js'
import sql from '../db.js'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

interface userObj {
  is_admin: boolean
  password: string
  fname: string
  lname: string
  dob: Date
  date_employed: Date
  email: string
  phone: string
}

interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

//Put initial values into database
const initializeTestDatabase = async () => {
  await api.post('/api/auth/logout')
  const pwToBeHashed = 'testpw'
  const pw = await bcrypt.hash(pwToBeHashed, 10)

  const firstUser: userObj = {
    is_admin: true,
    password: pw,
    fname: 'John',
    lname: 'Cena',
    dob: new Date('1977-04-23'),
    date_employed: new Date('2022-09-22'),
    email: 'johncena@gmail.com',
    phone: '9056434424'
  }

  const secondUser: userObj = {
    is_admin: false,
    password: pw,
    fname: 'Dave',
    lname: 'Bautista',
    dob: new Date('1969-01-18'),
    date_employed: new Date('2022-09-28'),
    email: 'davebautista@gmail.com',
    phone: '9052939291'
  }

  const newUser: userObj = {
    is_admin: false,
    password: 'testpw',
    fname: 'Jeremy',
    lname: 'Irons',
    dob: new Date('1969-01-18'),
    date_employed: new Date('2022-09-28'),
    email: 'jirons@gmail.com',
    phone: '9052939291'
  }

  const firstShift: shiftObj = {
    scheduled_start: new Date(),
    scheduled_end: new Date(),
    scheduled_hours: 8
  }

  const secondShift: shiftObj = {
    scheduled_start: new Date(),
    scheduled_end: new Date(),
    scheduled_hours: 8
  }

  const thirdShift: shiftObj = {
    scheduled_start: new Date(),
    scheduled_end: new Date(),
    scheduled_hours: 8
  }

  const firstId = await usersDB.createNewUser(firstUser)
  const secondId = await usersDB.createNewUser(secondUser)

  await sql
    `INSERT INTO users (is_admin, password, fname, lname, dob, date_employed, email, phone)
    VALUES (${newUser.is_admin}, ${pw}, ${newUser.fname}, ${newUser.lname}, ${newUser.dob}, 
      ${newUser.date_employed}, ${newUser.email}, ${newUser.phone}) RETURNING id;`
  
  await shiftsDB.createShift(firstId.id, firstShift)
  await shiftsDB.createShift(secondId.id, secondShift)
  await shiftsDB.createShift(secondId.id, thirdShift)
}

const clearTestDatabase = async () => {
  await sql
    `TRUNCATE shifts, users RESTART IDENTITY CASCADE`
}

export default { initializeTestDatabase, clearTestDatabase }