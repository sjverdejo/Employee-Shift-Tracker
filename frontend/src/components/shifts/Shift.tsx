//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import { ShiftInterface } from '../../interfaces/shifts'

const Shift = ({shift_id}:{shift_id: string}) => {
  const user = useAppSelector((state) => state.user)
  const emptyShift: ShiftInterface = {
    id: null,
    scheduled_start: null,
    scheduled_end: null,
    scheduled_hours: null,
    clock_in: null,
    clock_out: null
  }
  const [shift, setShift] = useState(emptyShift)
  const navigate = useNavigate()

  useEffect(() => {
    shiftsAPI.getShift(shift_id)
      .then(res => {
        //Redirect if user is not an admin, or shift does not belong to them
        if (user.is_admin || user.e_ID === res.employee) {
          setShift(res) //set state to response
        } else {
          navigate('/dashboard')
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>{shift.id}</h1>
    </>
  )
}

export default Shift