import { useState } from 'react'
import authentication from '../../services/authentication'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { user_sign_in } from '../../features/userSlice'

const SignInForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await authentication.sign_in(employeeId, password)

    if (response) {
      dispatch(user_sign_in(response))
    }

    setEmployeeId('')
    setPassword('')
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