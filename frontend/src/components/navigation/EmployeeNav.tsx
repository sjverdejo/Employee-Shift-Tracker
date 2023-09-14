import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import CommonNav from './CommonNav'

const EmployeeNav = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      <CommonNav />
      <Link to={`/dashboard/shifts/${user.e_ID}`}>My Shifts</Link>
    </>
  )
}

export default EmployeeNav