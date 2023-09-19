import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import { alert_message } from '../../features/alertMsgSlice'
import ShiftListItem from '../shifts/ShiftListItem'
import ShiftHelper from '../../utils/ShiftHelper'
import { ShiftInterface } from '../../interfaces/shifts'

const EmployeeDash = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [shift, setShift] = useState<ShiftInterface[]>([])

  useEffect(() => {
    shiftsAPI.getEmployeeShifts(user.e_ID)
      .then(res => {
        setShift(shift.concat(res))

        shift.filter((s) => ShiftHelper.isShiftAvailable(s.scheduled_start))
      })
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => dispatch(alert_message('Something went wrong.')))
  }, [])

  const NoShift = () => {
    return (
      <div className='flex flex-col justify-center items-center space-y-2'>
        <h1 className='text-6xl text-center text-blue-950'>No Shift Available</h1>
        <Link to={`/shifts/${user.e_ID}`}><button className='p-2 mt-5 bg-gradient-to-t from-stone-900 to-blue-950 w-96 rounded-lg shadow-xl text-stone-200'>View my Shifts</button></Link>
      </div>
      
    )
  }
  return (
    <>  
      <div className='flex justify-center items-center h-screen'>
        {shift.length !== 0 ? <ShiftListItem shift={shift[0]}/> : <NoShift />}
      </div>
    </>
  )
}

export default EmployeeDash