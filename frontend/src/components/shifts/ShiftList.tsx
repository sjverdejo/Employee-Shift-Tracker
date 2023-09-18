import ShiftListItem from './ShiftListItem'
import { ShiftInterface } from '../../interfaces/shifts'

const ShiftList = ({shifts}: {shifts: ShiftInterface[]}) => { //change type to interface eventually

  //display shifts from most recent to non

  return (
    <>
      {shifts.map((s) => <div className='odd:bg-stone-100 even:bg-blue-100 p-5' key={s.id}><ShiftListItem shift={s}/></div> )}
    </>
  )
}

export default ShiftList