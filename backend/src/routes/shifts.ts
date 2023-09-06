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


export default shiftsRouter