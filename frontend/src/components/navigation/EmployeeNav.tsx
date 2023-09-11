import { Link } from 'react-router-dom'

const EmployeeNav = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/'>My Shifts</Link>
      <Link to='/'>My Profile</Link>
    </>
  )
}

export default EmployeeNav