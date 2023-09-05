import sql from '../db.js'

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
  isAdmin: boolean
  password: string
  fName: string
  lName: string
  dob: Date
  dateEmployed: Date
  email: string
  phone: number
}

//Create a new user using provided user object
const createNewUser = async (newUser: userObject) => {
  const user = await sql
    `insert into users (isAdmin, password, fName, lName, dob, dateEmployed, email, phone)
    VALUES (${newUser.isAdmin}, ${newUser.password}, ${newUser.fName}, ${newUser.lName}, ${newUser.dob}, ${newUser.dateEmployed}, ${newUser.email}, ${newUser.phone});`

  return user
}

export default { getAllUsers, getUser, createNewUser }