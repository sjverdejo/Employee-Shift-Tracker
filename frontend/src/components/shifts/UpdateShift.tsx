/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import { NewShift } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'

const UpdateShift = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const { id } = useParams()
  const [scheduled_start, setScheduled_start] = useState(new Date('1950-01-01'))
  const [scheduled_end, setScheduled_end] = useState(new Date('1950-01-01'))
  const [clock_in, setClock_in] = useState(new Date('1950-01-01'))
  const [clock_out,setClock_out] = useState(new Date('1950-01-01'))
  const [showIn, setShowIn] = useState(false)
  const [showOut, setShowOut] = useState(false)
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      navigate('/dashboard')
    }

    shiftsAPI.getShift(id as string)
      .then(res => {
        setScheduled_start(res.scheduled_start)
        setScheduled_end(res.scheduled_end)
        setClock_in(res.clock_in)
        setClock_out(res.clock_out)
      })
      .catch(_err => navigate('/dashboard'))
  }, [])

  const updateShiftHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const shift: NewShift = {
      scheduled_start,
      scheduled_end,
      scheduled_hours: ShiftHelper.getDifference(scheduled_start, scheduled_end)
    }
    console.log(shift, id)
    shiftsAPI.updateShift(id as string, shift)
      .then(_res => navigate(`/dashboard/shifts`)) //add message about update
      .catch(_err => console.log(_err))
  }

  const updateClockIn = () => {
    shiftsAPI.clockIn(clock_in, id as string)
      .then(_res => navigate(`/dashboard/shifts`)) //add message about update
      .catch(_err => console.log(_err))
  }

  const updateClockOut = () => {
    shiftsAPI.clockOut(clock_out, id as string)
      .then(_res => navigate(`/dashboard/shifts/${user.e_ID}`)) //add message about update
      .catch(_err => console.log(_err))
  }
  //add validation for if clock in is before clock out
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