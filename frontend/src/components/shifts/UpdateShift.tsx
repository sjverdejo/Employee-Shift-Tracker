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
      .then(_res => { dispatch(alert_message('Updated successfully.')); navigate(`/shifts`)}) 
      .catch(_err => {dispatch(alert_message('Something went wrong')); return})
  }

  const updateClockIn = () => {
    if (clock_in > clock_out) {
      dispatch(alert_message('Invalid date.'))
      return
    }

    shiftsAPI.clockIn(clock_in, id as string)
      .then(_res => { dispatch(alert_message('Updated clock in time.')); navigate(`/shifts`)}) //add message about update
      .catch(_err => dispatch(alert_message('Something went wrong')))
  }

  const updateClockOut = () => {
    if (clock_out < clock_in) {
      dispatch(alert_message('Invalid date.'))
      return
    }

    shiftsAPI.clockOut(clock_out, id as string)
      .then(_res => { dispatch(alert_message('Updated clock out time.')); navigate(`/shifts/${user.e_ID}`)}) //add message about update
      .catch(_err => dispatch(alert_message('Something went wrong')))
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-3xl font-bold mb-5'>Update Items</h1>
      <div className='flex flex-col items-center justify-center bg-gradient-to-b to-stone-200 from-blue-200 h-1/3 w-1/2 relative rounded-xl shadow-xl border'>

        <form onSubmit={updateShiftHandler}>
          <div className='flex-col flex'>
          <label><b>Update Start Time:</b></label><input type='datetime-local' onChange={({target}) => setScheduled_start(new Date(target.value))} />
          <label><b>Update End Time:</b></label><input type='datetime-local' onChange={({target}) => setScheduled_end(new Date(target.value))} />
          <input className='bg-blue-950 text-stone-200 mt-2 rounded-md shadow-xl' type='submit' value='Update Shift Times'/>
          </div>
        </form>
    
        <div className='absolute bottom-0'>
          {(!showIn && !showOut) && 
          <div className='space-x-2 text-blue-400'>
            <button className='hover:text-blue-200' onClick={() => { setShowIn(!showIn); setShowOut(false)}}>Update Clock In</button>
            <button className='hover:text-blue-200' onClick={() => { setShowOut(!showOut); setShowIn(false)}}>Update Clock Out</button>
          </div>
          }
          {showIn &&
            <div className='flex space-x-2 p-2'>
              <form onSubmit={updateClockIn}>
                <input className='p-2 rounded-md shadow-xl' type='datetime-local' onChange={({target}) => setClock_in(new Date(target.value))} />
                <input className='shadow-xl rounded-md bg-blue-950 p-2 m-1 text-white' type='submit' value='Update Clock In'/>
              </form>
              <button className='text-blue-400 hover:text-blue-200' onClick={() => setShowIn(false)}>Cancel</button>
            </div>
          }
          {showOut &&
            <div className='flex space-x-2 p-2'>
              <form onSubmit={updateClockOut}>
                <input className='p-2 rounded-md shadow-xl' type='datetime-local' onChange={({target}) => setClock_out(new Date(target.value))} />
                <input className='shadow-xl rounded-md bg-blue-950 p-2 m-1 text-white' type='submit' value='Update Clock Out'/>
              </form>
              <button className='text-blue-400 hover:text-blue-200' onClick={() => setShowOut(false)}>Cancel</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default UpdateShift