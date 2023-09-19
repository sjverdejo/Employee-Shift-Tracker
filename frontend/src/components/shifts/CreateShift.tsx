/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import shiftsAPI from '../../services/shifts'
import { NewShift } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'
import { alert_message } from '../../features/alertMsgSlice'
import { FullEmployeeInterface } from '../../interfaces/users'

const CreateShift = () => {
  const user = useAppSelector((state) => state.user)
  const [users, setUsers] = useState<FullEmployeeInterface[]>([])
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
      .then(_res => {dispatch(alert_message('Created Sucessfully.')); navigate('/shifts')})
      .catch(_err => { dispatch(alert_message('Something went wrong.')); navigate('/dashboard')})
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>

      <h1 className='text-3xl'>Create Shift</h1>
      <div className='bg-gradient-to-b to-stone-200 from-blue-200 relative rounded-xl shadow-xl border'>
        <form onSubmit={handleCreate}>
        {/* make a drop down list for employee */}
          <div className='flex flex-col p-10'>
            <label><b>Employee: </b></label>
            <select value={employee} onChange={({target}) => setEmployee(target.value)}>
              {users.map(u => <option value={u.id as string}>Employee {u.id}: {u.lname}, {u.fname}</option>)}
            </select>
            <label><b>Start: </b></label><input type='datetime-local' onChange={({target}) => setScheduled_start(new Date(target.value))} />
            <label><b>End: </b></label><input type='datetime-local' onChange={({target}) => setScheduled_end(new Date(target.value))}/>
            <input className='mt-2 p-1 bg-blue-950 text-stone-200 mt-2 rounded-md shadow-xl' type='submit' value='Create'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateShift