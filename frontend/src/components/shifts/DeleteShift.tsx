/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'

const DeleteShift = ({id}:{id: string}) => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    if (!user.is_admin) {
      navigate('/dashboard')
    }
  }, [])

  const handleDelete = () => {
    if (confirm === 'Confirm Remove') {
      shiftsAPI.deleteShift(id)
        .then(_res => navigate('/dashboard/shifts'))
        .catch(_err => navigate('/dashboard'))
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