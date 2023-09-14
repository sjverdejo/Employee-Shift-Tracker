/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { NewEmployee } from '../../interfaces/users'
import EmployeeForm from './EmployeeForm'

const CreateEmployee = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<NewEmployee>({
    is_admin: null,
    password: null,
    fname: null,
    lname: null,
    dob: null,
    date_employed: null,
    email: null,
    phone: null
  })

  useEffect(() => {
    if (!user.is_admin) {
      navigate('/dashboard')
    }
  }, [])


  const createHandler = () => {
    //Create validation for ALL inputs
    usersAPI.createEmployee(employee)
      .then(_res => navigate('/')) //navigate to employeelist
      .catch(_err => navigate('/dashboard'))
  }

  return (
    <>
      <EmployeeForm parentHandler={createHandler} employeeSet={setEmployee} />
    </>
  )
}

export default CreateEmployee