/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import { NewShift } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'
import { alert_message } from '../../features/alertMsgSlice'

const UpdateShift = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [scheduled_start, setScheduled_start] = useState(new Date('1950-01-01'))
  const [scheduled_end, setScheduled_end] = useState(new Date('1950-01-01'))
  const [clock_in, setClock_in] = useState(new Date('1950-01-01'))
  const [clock_out,setClock_out] = useState(new Date('1950-01-01'))
  const [showIn, setShowIn] = useState(false)
  const [showOut, setShowOut] = useState(false)
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }

    shiftsAPI.getShift(id as string)
      .then(res => {
        setScheduled_start(res.scheduled_start)
        setScheduled_end(res.scheduled_end)
        setClock_in(res.clock_in)
        setClock_out(res.clock_out)
      })
      .catch(_err => { dispatch(alert_message('Something went wrong.')); navigate('/dashboard')})
  }, [])

  const updateShiftHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!ShiftHelper.validShift(scheduled_start, scheduled_end, id as string)) {
      dispatch(alert_message('Not valid shift.'))
      return
    }
    const shift: NewShift = {
      scheduled_start,
      scheduled_end,
      scheduled_hours: ShiftHelper.getDifference(scheduled_start, scheduled_end)
    }
    
    shiftsAPI.updateShift(id as string, shift)
      .then(_res => { dispatch(alert_message('Updated successfully.')); navigate(`/dashboard/shifts`)}) 
      .catch(_err => {dispatch(alert_message('Something went wrong')); return})
  }

  const updateClockIn = () => {
    if (clock_in > clock_out) {
      dispatch(alert_message('Invalid date.'))
      return
    }

    shiftsAPI.clockIn(clock_in, id as string)
      .then(_res => { dispatch(alert_message('Updated clock in time.')); navigate(`/dashboard/shifts`)}) //add message about update
      .catch(_err => dispatch(alert_message('Something went wrong')))
  }

  const updateClockOut = () => {
    if (clock_out < clock_in) {
      dispatch(alert_message('Invalid date.'))
      return
    }

    shiftsAPI.clockOut(clock_out, id as string)
      .then(_res => { dispatch(alert_message('Updated clock out time.')); navigate(`/dashboard/shifts/${user.e_ID}`)}) //add message about update
      .catch(_err => dispatch(alert_message('Something went wrong')))
  }

  return (
    <>
      <form onSubmit={updateShiftHandler}>
        <input type='datetime-local' onChange={({target}) => setScheduled_start(new Date(target.value))} />
        <input type='datetime-local' onChange={({target}) => setScheduled_end(new Date(target.value))} />
        <input type='submit' value='Update Shift Times'/>
      </form>
      <button onClick={() => { setShowIn(!showIn); setShowOut(false)}}>Update Clock In</button>
      <button onClick={() => { setShowOut(!showOut); setShowIn(false)}}>Update Clock Out</button>
        {showIn &&
          <form onSubmit={updateClockIn}>
            <input type='datetime-local' onChange={({target}) => setClock_in(new Date(target.value))} />
            <input type='submit' value='Update Clock In'/>
          </form>
        }
        {showOut &&
          <form onSubmit={updateClockOut}>
            <input type='datetime-local' onChange={({target}) => setClock_out(new Date(target.value))} />
            <input type='submit' value='Update Clock Out'/>
          </form>
        }
    </>
  )
}

export default UpdateShift