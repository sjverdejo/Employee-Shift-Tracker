import express from 'express'
import authCheck from '../utils/authCheck.js'
import db from '../database/shifts.js'

const shiftsRouter = express.Router()

//GET route for all shifts, admin only
shiftsRouter.get('/', authCheck, async (req, res) => {
  const shifts = await db.getAllShifts()

  res.json(shifts)
})

//GET route for specific shift, admin only
shiftsRouter.get('/:id', authCheck, async (req, res, next) => {
  try {
    const shift = await db.getShift(req.params.id)
    res.json(shift)
  } catch (error) {
    next(error)
  }
})

//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, async (req, res, next) => {
  try {
    const shifts = await db.getAllUserShifts(req.params.id)
    res.json(shifts)
  } catch (error) {
    next(error)
  }
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

//Create shift, admin only
shiftsRouter.post('/employee/:id', authCheck, async (req, res, next) => {
  const shift: shiftObj = req.body

  try {
    await db.createShift(req.params.id, shift)
    res.status(201).json()
  } catch (error) {
    next(error)
  }
})

//Update shift, ALL fields - Admin only
shiftsRouter.put('/:id', authCheck, async (req, res) => {
  const shift: shiftObj = req.body

  const updated = await db.updateShift(req.params.id, shift)

  res.json(updated)
})

//Clock in - for employees
shiftsRouter.put('/clockin/:id', authCheck, async (req, res) => {
  const in_time: Date = req.body

  const clock_in = await db.updateClockIn(req.params.id, in_time)

  res.json(clock_in)
})

//Clock out - for employees
shiftsRouter.put('/clockout/:id', authCheck, async (req, res) => {
  const out_time: Date = req.body

  const clock_out = await db.updateClockIn(req.params.id, out_time)

  res.json(clock_out)
})

shiftsRouter.delete('/:id', authCheck, async (req, res) => {
  const deleted = await db.deleteShift(req.params.id)

  res.json(deleted)
})

export default shiftsRouter