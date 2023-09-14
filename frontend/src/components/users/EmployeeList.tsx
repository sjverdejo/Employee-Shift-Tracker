import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppSelector } from "../../hooks/redux-hooks"
import usersAPI from '../../services/users'
import EmployeeListItem from './EmployeeListItem'
import { FullEmployeeInterface } from '../../interfaces/users'

const EmployeeList = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState<FullEmployeeInterface[]>([])

  useEffect(() => {
    if (!user.is_admin) {
      navigate('/dashboard')
    }

    usersAPI.getUsers()
      .then(res => {
        setAllUsers(allUsers.concat(res))
      })
      .catch(err => {
        console.log(err)
        navigate('/dashboard')
      })
  })

  return (
    <>
      <button><Link to=''>Create New Employee</Link></button>
      { allUsers && 
        allUsers.map((u) => <EmployeeListItem {...u} />)
      }
    </>
  )
}

export default EmployeeList