import { Link } from 'react-router-dom'
import CommonNav from './CommonNav'

const AdminNav = () => {
  return (
    <>
      <CommonNav />
      <Link to='/'>All Employees</Link>
      <Link to={`dashboard/all-shifts`}>All Shifts</Link>
    </>
  )
}

export default AdminNav