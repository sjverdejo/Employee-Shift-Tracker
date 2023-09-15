import axios from 'axios'
import { NewShift } from '../interfaces/shifts'

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

  return req.data
}

//CREATE new shift - Admin
const createNewShift = async (id: string, shift: NewShift) => {
  const req = await axios.post(`${base_url}/api/shifts/employee/${id}`, shift)

  return req.data
}

//UPDATE shift - Admin
const updateShift = async (id: string, shift: NewShift) => {
  const req = await axios.put(`${base_url}/api/shifts/${id}`, shift)

  return req.data
}
//CLOCK IN - Employee
const clockIn = async (in_time: Date, id: string) => {
  const date = {
    in_time
  }

  const req = await axios.put(`${base_url}/api/shifts/clockin/${id}`, date)

  return req.data
}

//CLOCK OUT - Employee
const clockOut = async (out_time: Date, id: string) => {
  const date = {
    out_time
  }

  const req = await axios.put(`${base_url}/api/shifts/clockout/${id}`, date)

  return req.data
}

//DELETE shift - Admin
const deleteShift = async (id: string) => {
  const req = await axios.delete(`${base_url}/api/shifts/${id}`)

  return req.data
}

export default {
  getShift, getAllShifts, getEmployeeShifts,
  createNewShift, updateShift, clockIn, clockOut, deleteShift
}
