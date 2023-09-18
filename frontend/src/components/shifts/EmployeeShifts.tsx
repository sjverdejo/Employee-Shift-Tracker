//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import shiftsAPI from '../../services/shifts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'
import { alert_message } from '../../features/alertMsgSlice'

const EmployeeShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=> {
    if (shifts.length === 0) {
      if ((user.is_admin || user.e_ID === id) && user.is_signed_in) {
        shiftsAPI.getEmployeeShifts(id as string)
        .then(res => {
          setShifts(shifts.concat(res))
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(_err => dispatch(alert_message('Something went wrong.')))
      } else {
        dispatch(alert_message('You are not permitted to see this page.'))
        navigate('/dashboard')
      }
    }
  }, [])

  return (
    <div className='pt-20 h-screen w-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl mb-5'>Employee {id}'s Shifts</h1>
      <div className='bg-slate-200 overflow-y-auto h-2/4 w-1/2 rounded-xl shadow-xl'>
        <ShiftList shifts={shifts}/>
      </div>
    </div>
  )
}

export default EmployeeShifts