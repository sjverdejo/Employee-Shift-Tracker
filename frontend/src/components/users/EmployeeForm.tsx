import { useState } from "react"
import { NewEmployee } from "../../interfaces/users"

const EmployeeForm = ({parentHandler}: {parentHandler:(e: NewEmployee) => void}) => {//({parentHandler}: {parentHandler: () => void}, {employeeSet}: {employeeSet: }) => {
  const [isAdmin, setIsAdmin] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState(new Date())
  const [dateEmployed, setDateEmployed] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

    if (newEmployee) {
      parentHandler(newEmployee)
    }
  }
  return (
    <form onSubmit={handler}>
      Admin: <input type='text' value={isAdmin} onChange={({target}) => setIsAdmin(target.value)} />
      Password: <input type='text' value={password} onChange={({target}) => setPassword(target.value)} />
      First Name: <input type='text' value={fname} onChange={({target}) => setFname(target.value)} />
      Last Name: <input type='text' value={lname} onChange={({target}) => setLname(target.value)} />
      Date of Birth: <input type='date' onChange={({target}) => setDob(new Date(target.value))} />
      Date Employed: <input type='date' onChange={({target}) => setDateEmployed(new Date(target.value))} />
      Email: <input type='email' value={email} onChange={({target}) => setEmail(target.value)} />
      Phone: <input type='number' value={phone} onChange={({target}) => setPhone(target.value)} />

      <input type='submit' value='Create Employee' />
  </form>
  )
}

export default EmployeeForm