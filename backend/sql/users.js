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

const createNewUser = async () => {

}


const updateUser = async (id) => {

}


const deleteUser = async () => {

}

module.exports = { getAllUsers, getUser, createNewUser, updateUser, deleteUser }
