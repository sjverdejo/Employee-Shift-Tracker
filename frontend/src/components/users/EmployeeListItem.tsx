import { Link } from 'react-router-dom'
import { FullEmployeeInterface } from '../../interfaces/users'

const EmployeeListItem = (employee: FullEmployeeInterface) => {
  return (
    <>
      <div className='flex justify-between'>
        <h1><b>Employee {employee.id}:</b> {employee.lname}, {employee.fname}</h1>
        <button className='bg-blue-950 text-stone-200 p-2 rounded-md shadow-xl'><Link to={`/employee/${employee.id}`}>View Profile</Link></button>
      </div>
    </>
  )
}

export default EmployeeListItem