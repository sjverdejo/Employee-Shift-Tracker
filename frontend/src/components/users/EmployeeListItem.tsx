import { Link } from 'react-router-dom'
import { FullEmployeeInterface } from '../../interfaces/users'

const EmployeeListItem = (employee: FullEmployeeInterface) => {
  return (
    <>
      <h1>{employee.fname}</h1>
      <button><Link to={`/dashboard/employee/${employee.id}`}>View Profile</Link></button>
    </>
  )
}

export default EmployeeListItem