/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import { alert_message } from '../../features/alertMsgSlice'

const DeleteShift = ({id}:{id: string}) => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    if (!user.is_admin) {
      dispatch(alert_message('You are not permitted to view this page.'))
      navigate('/dashboard')
    }
  }, [])

  const handleDelete = () => {
    if (confirm === 'Confirm Remove') {
      shiftsAPI.deleteShift(id)
        .then(_res => {dispatch(alert_message('Deleted successfully.')); navigate('/dashboard/shifts')})
        .catch(_err => {dispatch(alert_message('Something went wrong.'));navigate('/dashboard')})
    } else {
      return
    }
  }
  return (
    <>
      <form onSubmit={handleDelete}>
        Type 'Confirm Remove' to remove shift:
        <input type='text' value={confirm} onChange={({target}) => setConfirm(target.value)}/>
        <input type='submit' value='Submit' />
      </form>
    </>
  )
}

export default DeleteShift