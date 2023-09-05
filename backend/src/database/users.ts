import sql from '../db.js'
import bcrypt from 'bcrypt'

//Return all users in database
const getAllUsers = async () => {
  const users = await sql
  `select * from users;`

  return users
}

//Return one user with matching ID
const getUser = async (id: string) => {
  const user = await sql
  `select * from users where id = ${id};`

  return user
}

//Interface for user object type
interface userObject {
  is_admin: boolean
  password: string
  fname: string
  lname: string
  dob: Date
  date_employed: Date
  email: string
  phone: string
}

//Create a new user using provided user object
const createNewUser = async (newUser: userObject) => {
  //Hash the password so not stored directly to database
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

  const user = await sql
    `insert into users (is_admin, password, fname, lname, dob, date_employed, email, phone)
    VALUES (${newUser.is_admin}, ${passwordHash}, ${newUser.fname}, ${newUser.lname}, ${newUser.dob}, ${newUser.date_employed}, ${newUser.email}, ${newUser.phone});`

  return user
}

export default { getAllUsers, getUser, createNewUser }