import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'
import usersAPI from '../services/users'
import { alert_message } from '../features/alertMsgSlice'


const Dashboard = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [showButton, setShowButton] = useState(true) //If its on main page

  useEffect(() => {
    //ONLY show if on home page
    if (window.location.href.split('/').length === 4) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  })
  return (
    <>
      {showButton &&
        <div className='mt-20 h-96 flex flex-col justify-center items-center space-y-20'>
          <h1 className='text-6xl text-center'>Welcome To Company Home Page!</h1>
          <div className='flex flex-col justify-center items-center text-3xl space-y-2 text-white'>
            <Link to={`/dashboard/employee/new`}><button className='p-2 mt-5 bg-gradient-to-t from-stone-900 to-blue-950 w-96 rounded-lg shadow-xl' onClick={() => setShowButton(false)}>Add a New Employee</button></Link>
            <Link to={`/dashboard/shifts/new`}><button className='p-2 mt-5 bg-gradient-to-t from-stone-900 to-blue-950 rounded-sm shadow-lg w-96 ' onClick={() => setShowButton(false)}>Add a New Shift</button></Link>
          </div>
        </div>
        
      }
      <Outlet />
    </>
  )
}

export default Dashboard