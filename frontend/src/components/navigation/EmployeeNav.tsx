import { useAppSelector } from '../../hooks/redux-hooks'
import { Link } from 'react-router-dom'

const EmployeeNav = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      <Link to='/dashboard'>Home</Link>
      <Link to={`/dashboard/employee-shifts/${user.e_ID}`}>My Shifts</Link>
      <Link to='/'>My Profile</Link>
    </>
  )
}

export default EmployeeNav