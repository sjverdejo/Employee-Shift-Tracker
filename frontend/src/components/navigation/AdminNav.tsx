import { Link } from 'react-router-dom'
import CommonNav from './CommonNav'

const AdminNav = () => {
  return (
    <>
      <CommonNav />
      <Link to='/dashboard/employees'>All Employees</Link>
      <Link to={`/dashboard/employee-shifts`}>All Shifts</Link>
    </>
  )
}

export default AdminNav