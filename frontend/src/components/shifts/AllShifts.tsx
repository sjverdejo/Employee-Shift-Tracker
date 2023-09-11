//Admin View
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'

const AllShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.is_admin) {
      navigate('/')
    } 

    shiftsAPI.getAllShifts()
      .then(res => setShifts(shifts.concat(res)))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ShiftList shifts={shifts}/>
    </>
  )
}

export default AllShifts