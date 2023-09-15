/* eslint-disable @typescript-eslint/no-unused-vars */
//Admin and Employee View
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import shiftsAPI from '../../services/shifts'

import { ShiftInterface, PartialEmployeeInterface } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'
import DeleteShift from './DeleteShift'

const ShiftListItem = ({shift}:{shift: ShiftInterface}) => {
  const user = useAppSelector((state) => state.user)

  const emptyEmployee: PartialEmployeeInterface = {
    id: null,
    fname: null,
    lname: null
  }

  const [employee, setEmployee] = useState(emptyEmployee)
  const [showDelete, setShowDelete] = useState(false)
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

  const handleClockIn = () => {
    shiftsAPI.clockIn(new Date(), shift.id as string)
      .then(_res => navigate(`/dashboard/employee/${user.e_ID}`))
      .catch(_err => {console.log(_err);navigate('/dashboard')})
  }

  const handleClockOut = () => {
    shiftsAPI.clockOut(new Date(), shift.id as string)
    .then(_res => navigate(`/dashboard/employee/${user.e_ID}`))
    .catch(_err => navigate('/dashboard'))
  }

  //HIGHLIGHT SHIFT IF ITS IN PROGRESS search conditional css
  return (
    <>
      { (shift.id && employee.id) &&
        <>
          <p>{`Shift: ${ShiftHelper.toYMD(shift.scheduled_start)} Hours: ${shift.scheduled_hours}`}</p>
          <p>{`${shift.id} = Employee: ${employee.fname} ${employee.lname} Employee ID: ${employee.id}`}</p>
          {(user.e_ID === shift.employee && ShiftHelper.isShiftAvailable(shift.scheduled_start)) &&
            <>
              {shift.clock_in === null 
                ? <button onClick={handleClockIn}>Clock In</button>
                : <button>Clocked In</button>
              }
              {shift.clock_out === null 
                ? <button onClick={handleClockOut}>Clock Out</button>
                : <button>Clocked Out</button>

              }
            </>
          }
          {user.is_admin && 
            <>
            {/* pass id and in pages and get shift */}
              <Link to={`/dashboard/shifts/${shift.id}/update`}><button>Update Shift</button></Link>
              <button onClick={() => setShowDelete(!showDelete)}>Delete Shift</button>
              {showDelete && 
                <DeleteShift id={shift.id} />
              }
            </>
          }
        </>
      }
    </>
  )
}

export default ShiftListItem