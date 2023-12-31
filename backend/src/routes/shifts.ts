import express from 'express'
import db from '../database/shifts.js'
import authCheck from '../utils/authCheck.js'
import helper from '../utils/helper.js'

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
      res.json(shifts)
    } else {
      res.status(400).end()
    }
  } catch (error) {
    next(error)
  }
})

// shiftsRouter.get('/employee')

//Interface for new shift
interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

//Create shift, admin only
shiftsRouter.post('/employee/:id', authCheck, async (req, res, next) => {
  const shift: shiftObj = req.body

  console.log(shift)
  if (helper.validShift(shift)) {
    try {
      const newShift = await db.createShift(req.params.id, shift)
  
      if (newShift[0]) {
        res.status(201).json(newShift)
      } else {
        res.status(400).end()
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).end()
  }
  
})

//Update shift, ALL fields - Admin only
shiftsRouter.put('/:id', authCheck, async (req, res, next) => {
  const shift: shiftObj = req.body

  if (helper.validShift(shift)) {
    try {
     const updated = await db.updateShift(req.params.id, shift)
      if (updated[0]) {
        res.status(204).send()
      } else {
        res.status(400).end()
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).end()
  }
})

//Clock in - for employees
shiftsRouter.put('/clockin/:id', authCheck, async (req, res, next) => {
  const { in_time } = req.body

  if (in_time) {
    try {
      const update = await db.updateClockIn(req.params.id, in_time)
      if (update[0]) {
        res.status(204).send()
      } else {
        res.status(400).end()
      }
    } catch (error) {
      next(error)
    } 
  } else {
    res.status(400).end()
  }
  
})

//Clock out - for employees
shiftsRouter.put('/clockout/:id', authCheck, async (req, res, next) => {
  const { out_time } = req.body

  if (out_time) {
    try {
      const update = await db.updateClockOut(req.params.id, out_time)
      if (update[0]) {
        res.status(204).send()
      } else {
        res.status(400).end()
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).end()
  }
})

//Detele route for shift
shiftsRouter.delete('/:id', authCheck, async (req, res, next) => {
  try {
    const deleted = await db.deleteShift(req.params.id)
    console.log(deleted)
    if (deleted[0]) {
      res.status(204).send()
    } else {
      res.status(400).end()
    }
    
  } catch (error) {
    next(error)
}})

export default shiftsRouter