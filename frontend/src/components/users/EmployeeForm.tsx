import { useState } from "react"
import { NewEmployee } from "../../interfaces/users"
import { validEmployee } from "../../utils/EmployeeHelper"
import { useAppDispatch } from "../../hooks/redux-hooks"
import { alert_message } from "../../features/alertMsgSlice"
import { Link } from "react-router-dom"

const EmployeeForm = ({parentHandler}: {parentHandler:(e: NewEmployee) => void}) => {//({parentHandler}: {parentHandler: () => void}, {employeeSet}: {employeeSet: }) => {
  const [isAdmin, setIsAdmin] = useState('No')
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

    if (validEmployee(isAdmin, password, fname, lname, dob, dateEmployed, email, phone) !== '') {
      dispatch(alert_message(validEmployee(isAdmin, password, fname, lname, dob, dateEmployed, email, phone)))
      return
    }

    const newEmployee: NewEmployee = {
      //Create validation for ALL inputs
      is_admin: isAdmin === 'Yes',
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
    <div className='w-1/3'>
        <form onSubmit={handler}>
          <div className='flex flex-col p-12 bg-gradient-to-b to-stone-200 from-blue-200 rounded-xl shadow-xl text-blue-950 border-1 border-stone-400'>
            {/* <label className='font-bold'>Admin: </label><input className='p-1 rounded-md shadow-md' type='text' value={isAdmin} onChange={({target}) => setIsAdmin(target.value)} required/> */}
            <label className='font-bold'>Admin: </label>
            <select className='p-2 rounded-md shadow-md' value={isAdmin} onChange={({target}) => setIsAdmin(target.value)} required>
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
            <label className='font-bold'>Password: </label><input className='p-1 rounded-md shadow-md' type='text' value={password} onChange={({target}) => setPassword(target.value)} required/>
            <label className='font-bold'>First Name: </label><input className='p-1 rounded-md shadow-md' type='text' value={fname} onChange={({target}) => setFname(target.value)} required/>
            <label className='font-bold'>Last Name: </label><input className='p-1 rounded-md shadow-md' type='text' value={lname} onChange={({target}) => setLname(target.value)} required/>
            <label className='font-bold'>Date of Birth: </label><input className='p-1 rounded-md shadow-md' type='date' onChange={({target}) => setDob(new Date(target.value))} required/>
            <label className='font-bold'>Date Employed: </label><input className='p-1 rounded-md shadow-md' type='date' onChange={({target}) => setDateEmployed(new Date(target.value))} required/>
            <label className='font-bold'>Email: </label><input className='p-1 rounded-md shadow-md' type='email' value={email} onChange={({target}) => setEmail(target.value)} required/>
            <label className='font-bold'>Phone: </label><input className='p-1 rounded-md shadow-md' type='number' value={phone === 0 ? '' : phone} onChange={({target}) => setPhone(Number(target.value))} required/>

            <input className='bg-blue-950 mt-5 p-2 rounded-lg shadow-xl text-stone-200' type='submit' value='Submit' />
            <button><Link to={'/dashboard'}>Cancel</Link></button>
          </div>
        </form>
    </div>
  )
}

export default EmployeeForm