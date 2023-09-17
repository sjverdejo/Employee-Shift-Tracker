//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import shiftsAPI from '../../services/shifts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'
import ShiftListItem from './ShiftListItem'
import { alert_message } from '../../features/alertMsgSlice'

const EmployeeShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=> {
    if ((user.is_admin || user.e_ID === id) && user.is_signed_in) {
      shiftsAPI.getEmployeeShifts(id as string)
      .then(res => setShifts(shifts.concat(res)))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => dispatch(alert_message('Something went wrong.')))
    } else {
      dispatch(alert_message('You are not permitted to see this page.'))
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {/* Current: show current shift by date start >new Date <end date end  */}
      <ShiftListItem shift={shifts.find(s => s.scheduled_start < new Date() && s.scheduled_end > new Date()) as ShiftInterface}/>
      <ShiftList shifts={shifts}/>
    </>
  )
}

export default EmployeeShifts