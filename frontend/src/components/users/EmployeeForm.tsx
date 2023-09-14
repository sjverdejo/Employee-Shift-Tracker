import { useState } from "react"
import { NewEmployee } from "../../interfaces/users"

interface PProps {
  parentHandler: () => void
  employeeSet: React.Dispatch<React.SetStateAction<NewEmployee>>
}
const EmployeeForm: React.FC<PProps> = ({parentHandler, employeeSet}) => {//({parentHandler}: {parentHandler: () => void}, {employeeSet}: {employeeSet: }) => {
  const [isAdmin, setIsAdmin] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState(new Date())
  const [dateEmployed, setDateEmployed] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handler = () => {
    const newEmployee: NewEmployee = {
      //Create validation for ALL inputs
      is_admin: isAdmin === 'yes',
      password: password,
      fname: fname,
      lname: lname,
      dob: dob,
      date_employed: dateEmployed,
      email: email,
      phone: phone
    }
    employeeSet(newEmployee)

    if (newEmployee) {
      parentHandler()
    }
  }
  return (
    <form onSubmit={handler}>
      <input type='text' value={isAdmin} onChange={({target}) => setIsAdmin(target.value)} />
      <input type='text' value={password} onChange={({target}) => setPassword(target.value)} />
      <input type='text' value={fname} onChange={({target}) => setFname(target.value)} />
      <input type='text' value={lname} onChange={({target}) => setLname(target.value)} />
      <input type='date' onChange={({target}) => setDob(new Date(target.value))} />
      <input type='date' onChange={({target}) => setDateEmployed(new Date(target.value))} />
      <input type='email' value={email} onChange={({target}) => setEmail(target.value)} />
      <input type='number' value={phone} onChange={({target}) => setPhone(target.value)} />

      <input type='submit' value='Create Employee' />
  </form>
  )
}

export default EmployeeForm