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
    VALUES (${newShift.scheduled_start}, ${newShift.scheduled_end}, ${newShift.scheduled_hours}), 
    (SELECT id FROM users WHERE id = ${id});`;
    return create;
});
//Update Whole Shift - after clock in and clock out
const updateShift = (id, newShift) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield sql `UPDATE shifts
    SET scheduled_start = ${newShift.scheduled_start}, scheduled_end = ${newShift.scheduled_end}, scheduled_hours = ${newShift.scheduled_hours},
    clock_in = ${newShift.clock_in}, clock_out = ${newShift.clock_out}, clocked_hours = ${newShift.clocked_hours}
    WHERE id = ${id};`;
    return update;
});
//FOR non-admins to clock in
const updateClockIn = (id, in_time) => __awaiter(void 0, void 0, void 0, function* () {
    const clockIn = yield sql `UPDATE shifts
    SET clock_in = ${in_time}
    WHERE id = ${id};`;
    return clockIn;
});
//FOR non-admins to clock out
const updateClockOut = (id, out_time) => __awaiter(void 0, void 0, void 0, function* () {
    const clockOut = yield sql `UPDATE shifts
    SET clock_out = ${out_time}
    WHERE id = ${id};`;
    return clockOut;
});
const deleteShift = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield sql `DELETE FROM shifts
  WHERE id = ${id};`;
    return deleted;
});
export default {
    getAllShifts, getAllUserShifts, getShift, createShift,
    updateShift, updateClockIn, updateClockOut, deleteShift
};
