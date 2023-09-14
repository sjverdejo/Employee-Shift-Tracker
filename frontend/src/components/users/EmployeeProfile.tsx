import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { FullEmployeeInterface } from '../../interfaces/users'
import DeleteEmployee from './DeleteEmployee'

const EmployeeProfile = () => {
  const user = useAppSelector((state) => state.user)
  const { id } = useParams()
  const navigate = useNavigate()
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
    if (user.is_admin || user.e_ID === id) {
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
      { employee.id &&
        <>
          <h1>{employee.fname}</h1>
          <>
            {user.is_admin &&
              <>
                <button><Link to={`/dashboard/employee/${employee.id}/update`}>Edit Employee</Link></button>
                <button onClick={() => setShowDelete(!showDelete)}>Remove Employee</button>
                {showDelete && <DeleteEmployee id={employee.id}/>}
              </>
            }
          </>
        </>
      }
    </>
    
  )
}

export default EmployeeProfile