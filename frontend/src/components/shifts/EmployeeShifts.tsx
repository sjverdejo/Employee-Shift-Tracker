//Admin and Employee View
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import shiftsAPI from '../../services/shifts'
import { useAppSelector } from '../../hooks/redux-hooks'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'

const EmployeeShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(()=> {
    if (!user.is_admin || user.e_ID !== id) {
      navigate('/')
    }
    
    shiftsAPI.getEmployeeShifts(id as string)
      .then(res => setShifts(shifts.concat(res)))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ShiftList shifts={shifts}/>
    </>
  )
}

export default EmployeeShifts