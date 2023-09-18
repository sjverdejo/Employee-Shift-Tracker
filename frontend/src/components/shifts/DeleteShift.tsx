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
    if (confirm === 'Delete') {
      shiftsAPI.deleteShift(id)
        .then(_res => {dispatch(alert_message('Deleted successfully.')); navigate('/shifts')})
        .catch(_err => {dispatch(alert_message('Something went wrong.'));navigate('/dashboard')})
    } else {
      return
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleDelete} className='text-stone-950'>
          Type 'Delete' to confirm: 
          <input type='text' className='rounded-md border-2 p-1 text-sm' value={confirm} onChange={({target}) => setConfirm(target.value)}/>
          <input className='shadow-xl rounded-lg bg-blue-950 p-1 m-1 text-white' type='submit' value='Submit' />
        </form>
        {/* <button>Cacnel</button> */}
      </div>
      
    </>
  )
}

export default DeleteShift