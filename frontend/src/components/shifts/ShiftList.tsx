import Shift from './Shift'
import { ShiftInterface } from '../../interfaces/shifts'

const ShiftList = ({shifts}: {shifts: ShiftInterface[]}) => { //change type to interface eventually
  return (
    <>
    {/* add expand and edit button if admin */}
      {shifts.map((s) => <><Shift shift_id={s.id}/></> )}
    </>
  )
}

export default ShiftList