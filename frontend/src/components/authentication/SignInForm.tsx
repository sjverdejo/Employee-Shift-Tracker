import { useState } from 'react'
import authentication from '../../services/authentication'

const SignInForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await authentication.sign_in(employeeId, password)

    console.log('res', response)
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <label>Employee ID: </label>
        <input type='text' value={employeeId} onChange={({target}) => setEmployeeId(target.value)}/>
        <label>Password</label>
        <input type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
        <button type='submit'>Sign In</button>
      </form>
    </>
  )
}

export default SignInForm