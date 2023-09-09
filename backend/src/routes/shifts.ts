import express from 'express'
import db from '../database/shifts.js'
import authCheck from '../utils/authCheck.js'

const shiftsRouter = express.Router()

//GET route for all shifts, admin only
shiftsRouter.get('/', authCheck, async (req, res, next) => {
  const shifts = await db.getAllShifts()

  res.json(shifts)
})

//GET route for specific shift, admin only
shiftsRouter.get('/:id', authCheck, async (req, res, next) => {
  try {
    const shift = await db.getShift(req.params.id)

    if (shift[0]) {
      res.json(shift[0])
    } else {
      res.status(400).end()
    }
  } catch (error) {
    next(error)
  }
})

//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, async (req, res, next) => {
  try {
    const shifts = await db.getAllUserShifts(req.params.id)

    if (shifts) {
      console.log(`${req.params.id}`, shifts)
      res.json(shifts)
    } else {
      res.status(400).end()
    }
  } catch (error) {
    next(error)
  }
})

//Interface for new shift
interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

interface updateShiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
  clock_in: Date
  clock_out: Date
}

//Create shift, admin only
shiftsRouter.post('/employee/:id', authCheck, async (req, res, next) => {
  const shift: shiftObj = req.body

  console.log(typeof req.params.id)
  try {
    const newShift = await db.createShift(req.params.id, shift)
    res.status(201).json(newShift)
  } catch (error) {
    next(error)
  }
})

//Update shift, ALL fields - Admin only
shiftsRouter.put('/:id', authCheck, async (req, res, next) => {
  const shift: updateShiftObj = req.body

  try {
    await db.updateShift(req.params.id, shift)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

//Clock in - for employees
shiftsRouter.put('/clockin/:id', authCheck, async (req, res, next) => {
  const in_time: Date = req.body

  try {
    await db.updateClockIn(req.params.id, in_time)
    res.status(200).send()
  } catch (error) {
    next(error)
  } 
})

//Clock out - for employees
shiftsRouter.put('/clockout/:id', authCheck, async (req, res, next) => {
  const out_time: Date = req.body

  try {
    await db.updateClockIn(req.params.id, out_time)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

//Detele route for shift
shiftsRouter.delete('/:id', authCheck, async (req, res, next) => {
  try {
    await db.deleteShift(req.params.id)
    res.status(200).send()
  } catch (error) {
    next(error)
}})

export default shiftsRouter