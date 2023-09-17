/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import shiftsAPI from '../../services/shifts'
import { NewShift } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'
import { alert_message } from '../../features/alertMsgSlice'

const CreateShift = () => {
  const user = useAppSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [employee, setEmployee] = useState('')
  const [scheduled_start, setScheduled_start] = useState(new Date('1950-01-01'))
  const [scheduled_end, setScheduled_end] = useState(new Date('1950-01-01'))
  
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }

    usersAPI.getUsers()
      .then(res => setUsers(users.concat(res)))
      .catch(_err => { dispatch(alert_message('Something went wrong!')); navigate('/dashboard') })
  }, [])

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!ShiftHelper.validShift(scheduled_start, scheduled_end, employee)) {
      dispatch(alert_message('Not valid input.'))
      return
    }

    const newShift: NewShift = {
      scheduled_start,
      scheduled_end,
      scheduled_hours: ShiftHelper.getDifference(scheduled_start, scheduled_end)
    }

    shiftsAPI.createNewShift(employee, newShift)
      .then(_res => {dispatch(alert_message('Created Sucessfully.')); navigate('/dashboard/shifts')})
      .catch(_err => { dispatch(alert_message('Something went wrong.')); navigate('/dashboard')})
  }

  return (
    <>
      <form onSubmit={handleCreate}>
        {/* make a drop down list for employee */}
        Employee: <input type='text' value={employee} onChange={({target}) => setEmployee(target.value)}/>
        Date: <input type='datetime-local' onChange={({target}) => setScheduled_start(new Date(target.value))} />
        Start: <input type='datetime-local' onChange={({target}) => setScheduled_end(new Date(target.value))}/>
        <input type='submit' value='Create'/>
      </form>
    </>
  )
}

export default CreateShift