//Admin View
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'
import { alert_message } from '../../features/alertMsgSlice'

const AllShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not allowed to access this page.'))
      navigate('/dashboard')
    } 

    shiftsAPI.getAllShifts()
      .then(res => setShifts(shifts.concat(res)))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => {dispatch(alert_message('Something went wrong.')); navigate('/')})
  }, [])

  return (
    <>
      <Link to={`/dashboard/shifts/new`}><button>Post New Shift</button></Link>
      <ShiftList shifts={shifts}/>
    </>
  )
}

export default AllShifts