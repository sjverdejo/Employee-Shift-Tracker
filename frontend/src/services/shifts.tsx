import axios from 'axios'

const base_url: string = 'http://localhost:3001'

axios.defaults.withCredentials = true

//GET specific shift - Admin / Employee - (if owned)
const getShift = async (id: string) => {
  const req = await axios.get(`${base_url}/api/shifts/${id}`)

  return req.data
}

//GET all shifts - Admin
const getAllShifts = async () => {
  const req = await axios.get(`${base_url}/api/shifts`)

  return req.data
}

//GET all of employees shifts - Employee
const getEmployeeShifts = async (id: string) => {
  const req = await axios.get(`${base_url}/api/shifts/employee/${id}`)

  console.log(req.data)
  return req.data
}

//CREATE new employee - Admin

//UPDATE employee - Admin

//DELETE employee - Admin

//CLOCK IN - Employee
//CLOCK IN - Employee

export default {
  getShift, getAllShifts, getEmployeeShifts,
}
