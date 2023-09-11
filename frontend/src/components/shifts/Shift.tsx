//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'

const Shift = ({shift_id}:{shift_id: string}) => {
  const user = useAppSelector((state) => state.user)
  const [shift, setShift] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    shiftsAPI.getShift(shift_id)
      .then(res => {
        //Redirect if user is not an admin, or shift does not belong to them
        if (!user.is_admin || user.e_ID !== res.employee) {
          navigate('/')
        } else {
          setShift(res) //set state to response
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>{shift}</h1>
    </>
  )
}

export default Shift