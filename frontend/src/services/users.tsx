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
const createEmployee = async (newEmployee: NewEmployee) => {
  const req = await axios.post(`${base_url}/api/shifts/employee`, newEmployee)

  return req
}


export default {
  getUser, getUsers, createEmployee
}