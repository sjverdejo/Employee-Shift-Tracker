import sql from '../db.js'
import bcrypt from 'bcrypt'

//Return all users in database
const getAllUsers = async () => {
  const users = await sql
    `SELECT * FROM users;`

  return users
}

//Return one user with matching ID
const getUser = async (id: string) => {
  try {
    const user = await sql
    `SELECT * FROM users WHERE id = ${id};`

    return user[0]
  } catch (e) {
    return null
  }
  
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
    `INSERT INTO users (is_admin, password, fname, lname, dob, date_employed, email, phone)
    VALUES (${newUser.is_admin}, ${passwordHash}, ${newUser.fname}, ${newUser.lname}, ${newUser.dob}, 
      ${newUser.date_employed}, ${newUser.email}, ${newUser.phone}) RETURNING id;`

  return user[0]
}

//Update a user using a provided user object
const updateUser = async (id: string, updateUser: userObject) => {
  //Hash the password so not stored directly to database
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(updateUser.password, saltRounds)

  const updated = await sql
    `UPDATE users
    SET is_admin = ${updateUser.is_admin}, password = ${passwordHash}, fname = ${updateUser.fname}, lname = ${updateUser.lname}, 
    dob = ${updateUser.dob}, date_employed = ${updateUser.date_employed}, email = ${updateUser.email}, phone = ${updateUser.phone} 
    WHERE id = ${id} returning id;`

  return updated
}

const deleteUser = async (id: string) => {
  const deleted = await sql
    `DELETE FROM users where id = ${id} returning id;`

  return deleted
}

export default { getAllUsers, getUser, createNewUser, updateUser, deleteUser }