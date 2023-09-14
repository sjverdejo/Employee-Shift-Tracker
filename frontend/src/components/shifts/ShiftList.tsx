import ShiftListItem from './ShiftListItem'
import { ShiftInterface } from '../../interfaces/shifts'

const ShiftList = ({shifts}: {shifts: ShiftInterface[]}) => { //change type to interface eventually
  return (
    <>
    {/* add expand and edit button if admin */}
      {shifts.map((s) => <div key={s.id}><ShiftListItem shift={s}/></div> )}
    </>
  )
}

export default ShiftList