/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { NewEmployee } from '../../interfaces/users'
import EmployeeForm from './EmployeeForm'
import { alert_message } from '../../features/alertMsgSlice'

const UpdateEmployee = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  const updateHandler = (employee: NewEmployee) => {
    usersAPI.updateUser(employee, id as string)
      .then(_res => {
        dispatch(alert_message('Updated successfully.'))
        navigate('/dashboard/employees')}) 
      .catch(_err => { dispatch(alert_message('Something went wrong.')); navigate('/dashboard')})
  }

  return (
    <>
      <EmployeeForm parentHandler={updateHandler} />
    </>
  )
}

export default UpdateEmployee