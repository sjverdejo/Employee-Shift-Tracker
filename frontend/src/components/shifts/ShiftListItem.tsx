//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'

import { ShiftInterface, PartialEmployeeInterface } from '../../interfaces/shifts'

const Shift = ({shift}:{shift: ShiftInterface}) => {
  const user = useAppSelector((state) => state.user)

  const emptyEmployee: PartialEmployeeInterface = {
    id: null,
    fname: null,
    lname: null
  }

  const [employee, setEmployee] = useState(emptyEmployee)
  const navigate = useNavigate()

  useEffect(() => {
    //Redirect if user is not an admin, or shift does not belong to them
    if (user.is_admin || user.e_ID === shift.employee) {
      usersAPI.getUser(shift.employee as string)
        .then(res => {
          const foundEmployee: PartialEmployeeInterface = {
            id: res.id,
            fname: res.fname,
            lname: res.lname
          }
          setEmployee(foundEmployee)
        })
        .catch(err => {
          console.log(err)
          navigate('/dashboard')
        })
    } else {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      { (shift.id && employee.id) &&
        <>
          <p>{`Shift: ${shift.scheduled_start} - ${shift.scheduled_end} HOURS: ${shift.scheduled_hours}`}</p>
          <p>{`${shift.id} = Employee: ${employee.fname} ${employee.lname} Employee ID: ${employee.id}`}</p>
        </>
      }
    </>
  )
}

export default Shift