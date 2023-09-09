import express from 'express';
import db from '../database/shifts.js';
import authCheck from '../utils/authCheck.js';
import helper from '../utils/helper.js';
const shiftsRouter = express.Router();
//GET route for all shifts, admin only
shiftsRouter.get('/', authCheck, async (req, res, next) => {
    const shifts = await db.getAllShifts();
    res.json(shifts);
});
//GET route for specific shift, admin only
shiftsRouter.get('/:id', authCheck, async (req, res, next) => {
    try {
        const shift = await db.getShift(req.params.id);
        if (shift[0]) {
            res.json(shift[0]);
        }
        else {
            res.status(400).end();
        }
    }
    catch (error) {
        next(error);
    }
});
//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, async (req, res, next) => {
    try {
        const shifts = await db.getAllUserShifts(req.params.id);
        if (shifts) {
            res.json(shifts);
        }
        else {
            res.status(400).end();
        }
    }
    catch (error) {
        next(error);
    }
});
//Create shift, admin only
shiftsRouter.post('/employee/:id', authCheck, async (req, res, next) => {
    const shift = req.body;
    if (helper.validShift(shift)) {
        try {
            const newShift = await db.createShift(req.params.id, shift);
            if (newShift[0]) {
                res.status(201).json(newShift);
            }
            else {
                res.status(400).end();
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        res.status(400).end();
    }
});
//Update shift, ALL fields - Admin only
shiftsRouter.put('/:id', authCheck, async (req, res, next) => {
    const shift = req.body;
    if (helper.validShift(shift)) {
        try {
            await db.updateShift(req.params.id, shift);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
    else {
        res.status(400).end();
    }
});
//Clock in - for employees
shiftsRouter.put('/clockin/:id', authCheck, async (req, res, next) => {
    const in_time = req.body;
    try {
        await db.updateClockIn(req.params.id, in_time);
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
});
//Clock out - for employees
shiftsRouter.put('/clockout/:id', authCheck, async (req, res, next) => {
    const out_time = req.body;
    try {
        await db.updateClockIn(req.params.id, out_time);
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
});
//Detele route for shift
shiftsRouter.delete('/:id', authCheck, async (req, res, next) => {
    try {
        const deleted = await db.deleteShift(req.params.id);
        if (deleted[0]) {
            res.status(204).send();
        }
        else {
            res.status(400).end();
        }
    }
    catch (error) {
        next(error);
    }
});
export default shiftsRouter;
