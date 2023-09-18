/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { NewEmployee } from '../../interfaces/users'
import EmployeeForm from './EmployeeForm'
import { alert_message } from '../../features/alertMsgSlice'

const CreateEmployee = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  const createHandler = (employee: NewEmployee) => {
    usersAPI.createUser(employee)
      .then(_res => {
        dispatch(alert_message('Created successfully.'))
        navigate('/employees')}) 
      .catch(_err => {dispatch(alert_message('Something went wrong.')); navigate('/dashboard')})
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center pt-20'>
      <h1 className='text-3xl font-bold mb-5'>Create New Employee</h1>
      <EmployeeForm parentHandler={createHandler} />
    </div>
  )
}

export default CreateEmployee