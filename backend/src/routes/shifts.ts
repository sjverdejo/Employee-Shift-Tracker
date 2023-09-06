import express from 'express'
import authCheck from '../utils/authCheck.js'
import db from '../database/shifts.js'

const shiftsRouter = express.Router()

//GET route for all shifts
shiftsRouter.get('/', authCheck, async (req, res) => {
  const shifts = await db.getAllShifts()

  return shifts
})

//GET route for specific shift
shiftsRouter.get('/:id', authCheck, async (req, res) => {
  const shift = await db.getShift(req.params.id)

  return shift
})

//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, async (req, res) => {
  const shifts = await db.getAllUserShifts(req.params.id)

  return shifts
})

//Interface for new shift
interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
  clock_in: Date
  clock_out: Date
  clocked_hours: number
}

shiftsRouter.post('/employee/:id', authCheck, async (req, res) => {
  const shift: shiftObj = req.body

  const newShift = await db.createShift(req.params.id, shift)

  return newShift
})

export default shiftsRouter