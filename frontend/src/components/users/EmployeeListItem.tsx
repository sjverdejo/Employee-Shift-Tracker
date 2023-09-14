import { FullEmployeeInterface } from '../../interfaces/users'

const EmployeeListItem = (employee: FullEmployeeInterface) => {
  return (
    <>
      <h1>{employee.fname}</h1>
    </>
  )
}

export default EmployeeListItem