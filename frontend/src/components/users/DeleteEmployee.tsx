/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'
import { alert_message } from '../../features/alertMsgSlice'

const DeleteEmployee = ({id}: {id: string}) => { 
  const user = useAppSelector((state) => state.user)
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user.is_admin) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  const deleteHandler = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if (confirm === 'Delete') {
      usersAPI.deleteUser(id)
        .then(_res => { dispatch(alert_message('Deleted successfully.')); navigate('/employees')})
        .catch(_err => dispatch(alert_message('Something went wrong.')))
    } else {
      return
    }
  }

  return (
    <>
      <form onSubmit={deleteHandler}>
        Type 'Delete' to confirm:
        <input type='text' className='rounded-md border-2 p-1 text-sm' value={confirm} onChange={({target}) => setConfirm(target.value)}/>
        <input className='shadow-xl rounded-lg bg-blue-950 p-1 m-1 text-white' type='submit' value='Submit' />
      </form>
    </>
  )

}

export default DeleteEmployee