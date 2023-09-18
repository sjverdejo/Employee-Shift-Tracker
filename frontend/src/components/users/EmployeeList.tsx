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

    usersAPI.getUsers()
      .then(res => {
        setAllUsers(allUsers.concat(res))
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => {
        dispatch(alert_message('Something went wrong.'))
        navigate('/dashboard')
      })
  }, [])

  return (
    <>
      <Link to='/employee/new'><button>Create New Employee</button></Link>
      { allUsers && 
        allUsers.map((u) => <div key={u.id}><EmployeeListItem {...u} /></div>)
      }
    </>
  )
}

export default EmployeeList