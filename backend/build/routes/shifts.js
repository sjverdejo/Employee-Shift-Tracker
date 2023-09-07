var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import authCheck from '../utils/authCheck.js';
import db from '../database/shifts.js';
const shiftsRouter = express.Router();
//GET route for all shifts, admin only
shiftsRouter.get('/', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shifts = yield db.getAllShifts();
    res.json(shifts);
}));
//GET route for specific shift, admin only
shiftsRouter.get('/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shift = yield db.getShift(req.params.id);
        res.json(shift);
    }
    catch (error) {
        next(error);
    }
}));
//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield db.getAllUserShifts(req.params.id);
        res.json(shifts);
    }
    catch (error) {
        next(error);
    }
}));
//Create shift, admin only
shiftsRouter.post('/employee/:id', authCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = req.body;
    try {
        yield db.createShift(req.params.id, shift);
        res.status(201).json();
    }
    catch (error) {
        next(error);
    }
}));
//Update shift, ALL fields - Admin only
shiftsRouter.put('/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = req.body;
    const updated = yield db.updateShift(req.params.id, shift);
    res.json(updated);
}));
//Clock in - for employees
shiftsRouter.put('/clockin/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const in_time = req.body;
    const clock_in = yield db.updateClockIn(req.params.id, in_time);
    res.json(clock_in);
}));
//Clock out - for employees
shiftsRouter.put('/clockout/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const out_time = req.body;
    const clock_out = yield db.updateClockIn(req.params.id, out_time);
    res.json(clock_out);
}));
shiftsRouter.delete('/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield db.deleteShift(req.params.id);
    res.json(deleted);
}));
export default shiftsRouter;
