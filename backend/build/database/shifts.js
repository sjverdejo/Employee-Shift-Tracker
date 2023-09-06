var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sql from '../db.js';
//Return all shifts
const getAllShifts = () => __awaiter(void 0, void 0, void 0, function* () {
    const shifts = yield sql `SELECT * FROM shifts;`;
    return shifts;
});
//Return all shifts belonging to specific user
const getAllUserShifts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const shifts = yield sql `SELECT * FROM shifts WHERE employee = ${id};`;
    return shifts;
});
//Return one shift 
const getShift = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = yield sql `SELECT * FROM shifts WHERE id = ${id};`;
    return shift;
});
//Create a new shift for an employee, only for scheduled start, scheduled end, and scheduled hours + employee assigned
const createShift = (id, newShift) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield sql `INSERT INTO shifts (scheduled_start, scheduled_end, scheduled_hours, employee)
    VALUES (${newShift.scheduled_start}, ${newShift.scheduled_end}, ${newShift.scheduled_hours}), (SELECT id FROM users WHERE id = ${id});`;
    return create;
});
export default { getAllShifts, getShift, createShift };
