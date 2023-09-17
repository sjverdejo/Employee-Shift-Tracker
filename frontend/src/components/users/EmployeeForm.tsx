import { useState } from "react"
import { NewEmployee } from "../../interfaces/users"
import { validEmployee } from "../../utils/EmployeeHelper"
import { useAppDispatch } from "../../hooks/redux-hooks"
import { alert_message } from "../../features/alertMsgSlice"

const EmployeeForm = ({parentHandler}: {parentHandler:(e: NewEmployee) => void}) => {//({parentHandler}: {parentHandler: () => void}, {employeeSet}: {employeeSet: }) => {
  const [isAdmin, setIsAdmin] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState(new Date())
  const [dateEmployed, setDateEmployed] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const dispatch = useAppDispatch()

  const handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validEmployee(isAdmin, password, fname, lname, dob, dateEmployed, email, phone)) {
      dispatch(alert_message('Invalid input, try again.'))
      return
    }

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
      Admin: <input type='text' value={isAdmin} onChange={({target}) => setIsAdmin(target.value)} required/>
      Password: <input type='text' value={password} onChange={({target}) => setPassword(target.value)} required/>
      First Name: <input type='text' value={fname} onChange={({target}) => setFname(target.value)} required/>
      Last Name: <input type='text' value={lname} onChange={({target}) => setLname(target.value)} required/>
      Date of Birth: <input type='date' onChange={({target}) => setDob(new Date(target.value))} required/>
      Date Employed: <input type='date' onChange={({target}) => setDateEmployed(new Date(target.value))} required/>
      Email: <input type='email' value={email} onChange={({target}) => setEmail(target.value)} required/>
      Phone: <input type='number' value={phone} onChange={({target}) => setPhone(Number(target.value))} required/>

      <input type='submit' value='Submit' />
  </form>
  )
}

export default EmployeeForm