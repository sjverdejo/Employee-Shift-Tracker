/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import usersAPI from '../../services/users'

const DeleteEmployee = ({id}: {id: string}) => { 
  const user = useAppSelector((state) => state.user)
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user.e_ID === id || !user.is_admin) {
      navigate('/dashboard')
      //update message to say cant delete your own
    }
  }, [])

  const deleteHandler = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if (confirm === 'Confirm Remove') {
      usersAPI.deleteUser(id)
        .then(_res => navigate('/dashboard/employees'))
        .catch(_err => console.log(_err))
    } else {
      return
    }
  }

  return (
    <>
      <form onSubmit={deleteHandler}>
        Type 'Confirm Remove' to remove employee:
        <input type='text' value={confirm} onChange={({target}) => setConfirm(target.value)}/>
        <input type='submit' value='Submit' />
      </form>
    </>
  )

}

export default DeleteEmployee