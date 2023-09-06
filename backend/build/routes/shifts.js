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
//GET route for all shifts
shiftsRouter.get('/', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shifts = yield db.getAllShifts();
    return shifts;
}));
//GET route for specific shift
shiftsRouter.get('/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = yield db.getShift(req.params.id);
    return shift;
}));
//GET route for all shifts for certain employee
shiftsRouter.get('/employee/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shifts = yield db.getAllUserShifts(req.params.id);
    return shifts;
}));
shiftsRouter.post('/employee/:id', authCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = req.body;
    const newShift = yield db.createShift(req.params.id, shift);
    return newShift;
}));
export default shiftsRouter;
