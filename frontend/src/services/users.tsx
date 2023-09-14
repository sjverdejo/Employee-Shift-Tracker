import axios from 'axios'
import { NewEmployee } from '../interfaces/users'

const base_url: string = 'http://localhost:3001'

axios.defaults.withCredentials = true

//Get single employee
const getUser = async (id: string) => {
  const req = await axios.get(`${base_url}/api/users/${id}`)

  return req.data
}

//Get all employees
const getUsers = async () => {
  const req = await axios.get(`${base_url}/api/users`)

  return req.data
}

//Create new employee
const createUser = async (newE: NewEmployee) => {
  const req = await axios.post(`${base_url}/api/users`, newE)
  
  return req.data
}

//Update employee
const updateUser = async (updatedE: NewEmployee, id: string) => {
  const req = await axios.put(`${base_url}/api/users/${id}`, updatedE)

  return req.data
}

//Delete employee
const deleteUser = async (id: string) => {
  const req = await axios.delete(`${base_url}/api/users/${id}`)

  return req.data
}

export default {
  getUser, getUsers, createUser,
  updateUser, deleteUser
}