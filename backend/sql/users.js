const sql = require('../db')

const getAllUsers = async () => {
  const users = await sql
    `select * from users;`
  console.log(users)
  return users
}

const getUser = async (id) => {
  const user = await sql
    `select * from users where id=${id};`

  return user
}

const createNewUser = async (newUser) => {
  const user = await sql
    `insert into users (isAdmin, password, fName, lName, dob, dateEmployed, email, phone)
    VALUES (${newUser.isAdmin}, ${newUser.password}, ${newUser.fName}, ${newUser.lName}, ${newUser.dob}, ${newUser.dateEmployed}, ${newUser.email}, ${newUser.phone});`

  return user
}


const updateUser = async (id) => {

}


const deleteUser = async () => {

}

module.exports = { getAllUsers, getUser, createNewUser, updateUser, deleteUser }
