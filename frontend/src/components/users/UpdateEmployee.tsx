/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { NewEmployee } from '../../interfaces/users'
import EmployeeForm from './EmployeeForm'

const UpdateEmployee = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
       navigate('/dashboard')
    }
  }, [])

  const updateHandler = (employee: NewEmployee) => {
    usersAPI.updateUser(employee, id as string)
      .then(_res => navigate('/dashboard/employees')) 
      .catch(_err => {console.log(_err); navigate('/dashboard')})
  }

  return (
    <>
      <EmployeeForm parentHandler={updateHandler} />
    </>
  )
}

export default UpdateEmployee