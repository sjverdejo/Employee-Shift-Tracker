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
  clock_in: Date
  clock_out: Date
  clocked_hours: number
}

//Create a new shift for an employee, only for scheduled start, scheduled end, and scheduled hours + employee assigned
const createShift = async (id: string, newShift: shiftObj) => {
  const create = await sql
    `INSERT INTO shifts (scheduled_start, scheduled_end, scheduled_hours, employee)
    VALUES (${newShift.scheduled_start}, ${newShift.scheduled_end}, ${newShift.scheduled_hours}), (SELECT id FROM users WHERE id = ${id});`

  return create
}

const updateScheduledShift = async (id: string, newShift: shiftObj) => {
  const update = await sql
    `UPDATE shifts
    SET scheduled_start = ${newShift.scheduled_start}, scheduled_end = ${newShift.scheduled_end}, scheduled_hours = ${newShift.scheduled_hours}
    WHERE id = ${id};`

  return update
}

//Update Whole Shift - after clock in and clock out
const updateShift = async (id: string, newShift: shiftObj) => {
  const update = await sql
    `UPDATE shifts
    SET scheduled_start = ${newShift.scheduled_start}, scheduled_end = ${newShift.scheduled_end}, scheduled_hours = ${newShift.scheduled_hours}, \
    clock_in = ${newShift.clock_in}, clock_out = ${newShift.clock_out}, clocked_hours = ${newShift.clocked_hours}
    WHERE id = ${id};`

  return update
}

//FOR non-admins to clock in
const updateClockIn = async (id: string, in_time: Date) => {
  const clockIn = await sql
    `UPDATE shifts
    SET clock_in = ${in_time}
    WHERE id = ${id}`

  return clockIn
}

//FOR non-admins to clock out
const updateClockOut = async (id: string, out_time: Date) => {
  const clockOut = await sql
    `UPDATE shifts
    SET clock_out = ${out_time}
    WHERE id = ${id}`

  return clockOut

}

export default { getAllShifts, getAllUserShifts, getShift, createShift, updateScheduledShift, updateShift, updateClockIn, updateClockOut }