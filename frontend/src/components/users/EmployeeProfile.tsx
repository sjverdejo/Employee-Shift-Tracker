import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { FullEmployeeInterface } from '../../interfaces/users'
import DeleteEmployee from './DeleteEmployee'
import { alert_message } from '../../features/alertMsgSlice'

const EmployeeProfile = () => {
  const user = useAppSelector((state) => state.user)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const emptyEmployee: FullEmployeeInterface = {
    id: null,
    is_admin: null,
    fname: null,
    lname: null,
    dob: null,
    date_employed: null,
    email: null, 
    phone: null
  }

  const [employee, setEmployee] = useState(emptyEmployee)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if ((user.is_admin || user.e_ID === id) && user.is_signed_in) {
      usersAPI.getUser(id as string)
      .then(res => {
        const newEmployee: FullEmployeeInterface = {
          id: res.id,
          is_admin: res.is_admin,
          fname: res.fname,
          lname: res.lname,
          dob: res.dob,
          date_employed: res.date_employed,
          email: res.email,
          phone: res.phone
        }

        setEmployee(newEmployee)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => {
        dispatch(alert_message('Something went wrong.'))
        navigate('/dashboard')
      })
    } else {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className='pt-64 flex items-center justify-center'>
      { employee.id &&
        <div className='text-blue-950 flex items-center flex-col bg-gradient-to-b to-stone-200 from-blue-200 shadow-xl rounded-xl p-20 w-1/2 h-96 relative border-1 border-stone-400'>
          <h1 className='text-3xl font-bold'>Employee Information</h1>
          <div className='flex flex-col'>
            <div className='flex space-x-5'>
              <h2><b>Last Name: </b>{employee.lname}</h2>
              <h2><b>First Name: </b>{employee.fname}</h2>
            </div>
            <h2><b>Date of Birth: </b>{new Date(employee.dob as Date).toLocaleDateString()}</h2>
            <h2><b>Date Employed: </b>{new Date(employee.date_employed as Date).toLocaleDateString()}</h2>
            <h1 className='text-3xl font-bold'>Contact Information</h1>
            <h2><b>Email: </b>{employee.email}</h2>
            <h2><b>Phone: </b>{employee.phone}</h2>
            <Link to={`/shifts/${employee.id}`}><button className='mt-5 bg-blue-950 w-full text-stone-200'>View {employee.fname}'s Shifts</button></Link>
          </div>
          
          <div>

          </div>
          
          <>
            {user.is_admin &&
              <div className='absolute bottom-0'>
                {!showDelete &&
                  <div className='space-x-2 text-blue-400 text-center'>
                    <button className='shadow-xl hover:text-blue-200'><Link to={`/employee/${employee.id}/update`}>Edit Employee</Link></button>
                    <button className='shadow-xl hover:text-blue-200' onClick={() => setShowDelete(!showDelete)}>Remove Employee</button>
                  </div>
                }
                {showDelete &&
                  <div className='flex mt-2'>
                    <DeleteEmployee id={employee.id}/>
                    <button onClick={() => setShowDelete(false)}>Cancel</button>
                  </div>
                  }
              </div>
            }
          </>
        </div>
      }
    </div>
    
  )
}

export default EmployeeProfile