/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import shiftsAPI from '../../services/shifts'
import { NewShift } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'

const CreateShift = () => {
  const user = useAppSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const [employee, setEmployee] = useState('')
  const [scheduled_start, setScheduled_start] = useState(new Date('1950-01-01'))
  const [scheduled_end, setScheduled_end] = useState(new Date('1950-01-01'))
  
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      navigate('/dashboard')
    }

    usersAPI.getUsers()
      .then(res => setUsers(users.concat(res)))
      .catch(err => { console.log(err); navigate('/dashboard') })
  }, [])

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //validate inputs
    //Validate that date is either for today or greater
    //time end can not be before start
    
    const newShift: NewShift = {
      scheduled_start,
      scheduled_end,
      scheduled_hours: ShiftHelper.getDifference(scheduled_start, scheduled_end)
    }

    console.log(newShift)

    shiftsAPI.createNewShift(employee, newShift)
      .then(_res => navigate('/dashboard/shifts'))
      .catch(err => { console.log(err); navigate('/dashboard')})
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