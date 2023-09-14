//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import usersAPI from '../../services/users'

import { ShiftInterface, PartialEmployeeInterface } from '../../interfaces/shifts'

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

  const emptyEmployee: PartialEmployeeInterface = {
    id: null,
    fname: null,
    lname: null
  }

  const [shift, setShift] = useState(emptyShift)
  const [employee, setEmployee] = useState(emptyEmployee)
  const navigate = useNavigate()

  useEffect(() => {
    shiftsAPI.getShift(shift_id)
      .then(res => {
        //Redirect if user is not an admin, or shift does not belong to them
        if (user.is_admin || user.e_ID === res.employee) {
          setShift(res) //set state to response
          usersAPI.getUser(res.employee)
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
          console.log('here')
          navigate('/dashboard')
        }
      })
      .catch(err => {
        console.log(err)
        navigate('/dashboard')
      })
  }, [])

  return (
    <>
      { (shift.id && employee.id) &&
        <p>{`Employee: ${employee.fname} ${employee.lname} Employee ID: ${employee.id}`}</p>
      }
    </>
  )
}

export default Shift