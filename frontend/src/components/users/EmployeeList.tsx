import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import usersAPI from '../../services/users'
import EmployeeListItem from './EmployeeListItem'
import { FullEmployeeInterface } from '../../interfaces/users'
import { alert_message } from '../../features/alertMsgSlice'

const EmployeeList = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [allUsers, setAllUsers] = useState<FullEmployeeInterface[]>([])

  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }

    if (allUsers.length === 0) {
    usersAPI.getUsers()
      .then(res => {
        setAllUsers(allUsers.concat(res))
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => {
        dispatch(alert_message('Something went wrong.'))
        navigate('/dashboard')
      })
    }
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-5'>Employees</h1>
      <div className='w-1/2 shadow-xl rounded-xl border overflow-y-auto h-1/2'>
      { allUsers && 
        allUsers.map((u) => <div className='odd:bg-stone-100 even:bg-blue-100 p-5' key={u.id}><EmployeeListItem {...u} /></div>)
      }
      </div>
      <Link to='/employee/new'><button className='text-stone-200 bg-blue-950 p-2 px-20 mt-2 rounded-md shadow-xl'>Create New Employee</button></Link>
    </div>
  )
}

export default EmployeeList