//Admin View
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import shiftsAPI from '../../services/shifts'
import ShiftList from './ShiftList'
import { ShiftInterface } from '../../interfaces/shifts'
import { alert_message } from '../../features/alertMsgSlice'

const AllShifts = () => {
  const user = useAppSelector((state) => state.user)
  const [shifts, setShifts] = useState<ShiftInterface[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!user.is_admin || !user.is_signed_in) {
      dispatch(alert_message('You are not allowed to access this page.'))
      navigate('/dashboard')
    } 

    shiftsAPI.getAllShifts()
      .then(res => setShifts(shifts.concat(res)))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_err => {dispatch(alert_message('Something went wrong.')); navigate('/')})
  }, [])

  return (
    <>
      <div className='pt-20 h-screen w-screen flex flex-col items-center justify-center'>
        <h1 className='text-3xl mb-5'>All Employee Shifts</h1>
        <div className='bg-slate-200 overflow-y-auto h-2/4 w-1/2 rounded-xl shadow-xl'>
          <ShiftList shifts={shifts}/>
        </div>
        <Link to={`/shifts/new`}><button className='text-stone-200 bg-blue-950 p-2 px-20 mt-2 rounded-md shadow-xl'>Post New Shift</button></Link>
      </div>
    </>
  )
}

export default AllShifts