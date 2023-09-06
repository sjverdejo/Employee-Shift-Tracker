import internal from 'stream'
import sql from '../db.js'

//Return all shifts
const getAllShifts = async () => {

}

//Return one shift 
const getShift = async (id: string) => {

}

//Interface for new shift
interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

//Create a new shift for an employee
const createShift = async (id: string, newShift: shiftObj) => {
  const create = await sql
    `INSERT INTO shifts (scheduled_start, scheduled_end, scheduled_hours, employee)
    VALUES (${newShift.scheduled_start}, ${newShift.scheduled_end}, ${newShift.scheduled_hours}), (SELECT id FROM users WHERE id = ${id})`

  return create
}

export default { getAllShifts, getShift, createShift }