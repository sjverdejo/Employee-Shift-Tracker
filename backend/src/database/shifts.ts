import sql from '../db.js'

//Return all shifts
const getAllShifts = async () => {
  const shifts = await sql
    `SELECT * FROM shifts;`

  return shifts
}

//Return all shifts belonging to specific user
const getAllUserShifts = async (id: string) => {
  const shifts = await sql
    `SELECT * FROM shifts WHERE employee = ${id};`

  return shifts
}

//Return one shift 
const getShift = async (id: string) => {
  const shift = await sql
    `SELECT * FROM shifts WHERE id = ${id};`

  return shift
}

//Interface for new shift
interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

//Create a new shift for an employee, only for scheduled start, scheduled end, and scheduled hours + employee assigned
const createShift = async (id: string, newShift: shiftObj) => {
  const create = await sql
    `INSERT INTO shifts (scheduled_start, scheduled_end, scheduled_hours, employee)
    VALUES (${newShift.scheduled_start}, ${newShift.scheduled_end}, ${newShift.scheduled_hours}), (SELECT id FROM users WHERE id = ${id});`

  return create
}

export default { getAllShifts, getShift, createShift }