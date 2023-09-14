import Shift from './Shift'
import { ShiftInterface } from '../../interfaces/shifts'

const ShiftList = ({shifts}: {shifts: ShiftInterface[]}) => { //change type to interface eventually
  return (
    <>
    {/* add expand and edit button if admin */}
      {shifts.map((s) => <div key={s.id}><Shift shift_id={s.id as string}/></div> )}
    </>
  )
}

export default ShiftList