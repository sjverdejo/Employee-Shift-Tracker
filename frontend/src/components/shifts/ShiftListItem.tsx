/* eslint-disable @typescript-eslint/no-unused-vars */
//Admin and Employee View
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import shiftsAPI from '../../services/shifts'

import { ShiftInterface, PartialEmployeeInterface } from '../../interfaces/shifts'
import ShiftHelper from '../../utils/ShiftHelper'
import DeleteShift from './DeleteShift'
import { alert_message } from '../../features/alertMsgSlice'

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
  const dispatch = useAppDispatch()

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
        .catch(_err => {
          dispatch(alert_message('Something went wrong.'))
          navigate('/dashboard')
        })
    } else {
      dispatch(alert_message('you are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  const handleClockIn = () => {
    shiftsAPI.clockIn(new Date(), shift.id as string)
      .then(_res => {
        dispatch(alert_message('Clocked in.'))
        navigate(`/employee/${user.e_ID}`)})
      .catch(_err => {
        dispatch(alert_message('Something went wrong.'))
        navigate('/dashboard')})
  }

  const handleClockOut = () => {
    shiftsAPI.clockOut(new Date(), shift.id as string)
    .then(_res => {
      dispatch(alert_message('Clocked out.'))
      navigate(`/employee/${user.e_ID}`)})
    .catch(_err => {
      dispatch(alert_message('Clocked out.'))
      navigate('/dashboard')})
  }

  //HIGHLIGHT SHIFT IF ITS IN PROGRESS search conditional css
  return (
    <div>
      {(shift.id && employee.id) &&
        <div className=' h-20 relative flex flex-col'>
          <div className='flex flex-col'>
            <p><b>Shift: </b> {ShiftHelper.toYMD(shift.scheduled_start)} <b>Hours: </b> {shift.scheduled_hours}</p>
            <p><b>Employee: </b>{employee.lname}, {employee.fname} <b>ID: </b>{employee.id}</p>
          </div>
          {(user.e_ID === shift.employee && ShiftHelper.isShiftAvailable(shift.scheduled_start)) &&
            <div className='absolute right-5 top-0 bottom-0 flex items-center space-x-2 '>
              {shift.clock_in === null 
                ? <button className='bg-blue-950 hover:bg-stone-400 rounded-md text-white w-24 p-1' onClick={handleClockIn}>Clock In</button>
                : <button className='bg-stone-400 rounded-md text-white w-24 p-1'>Clocked In</button>
              }
              {shift.clock_out === null 
                ? <button className='bg-blue-950 rounded-md text-white w-24 p-1' onClick={handleClockOut}>Clock Out</button>
                : <button className='bg-stone-400 rounded-md text-white w-24 p-1'>Clocked Out</button>

              }
            </div>
          }
          {user.is_admin && 
            <div className='flex'>
              {!showDelete &&
                <div className='text-blue-400 mt-2 space-x-2'>
                  <Link to={`/shifts/${shift.id}/update`}><button className='hover:text-stone-400'>Update Shift</button></Link>
                  <button className='hover:text-stone-400' onClick={() => setShowDelete(!showDelete)}>Delete Shift</button>
                </div>
              }
              {showDelete && 
              <div className='flex'>
                <DeleteShift id={shift.id} />
                <button className='text-blue-400 hover:text-stone-400'onClick={()=> setShowDelete(false)}>Cancel</button>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  )
}

export default ShiftListItem