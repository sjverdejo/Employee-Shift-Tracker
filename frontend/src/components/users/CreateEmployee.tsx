/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { NewEmployee } from '../../interfaces/users'
import EmployeeForm from './EmployeeForm'

const CreateEmployee = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      navigate('/dashboard')
    }
  }, [])

  const createHandler = (employee: NewEmployee) => {
    usersAPI.createUser(employee)
      .then(_res => navigate('/dashboard/employees')) 
      .catch(_err => {console.log(_err); navigate('/dashboard')})
  }

  return (
    <>
      <EmployeeForm parentHandler={createHandler} />
    </>
  )
}

export default CreateEmployee