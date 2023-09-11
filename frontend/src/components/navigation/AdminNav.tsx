import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/'>Employees</Link>
      <Link to='/'>All Shifts</Link>
      <Link to='/'>My Profile</Link>
    </>
  )
}

export default AdminNav