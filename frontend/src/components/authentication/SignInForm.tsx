import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authentication from '../../services/authentication'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { user_sign_in } from '../../features/userSlice'
import { alert_message } from '../../features/alertMsgSlice'
const SignInForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //Form submission handler, set user state if successful
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (employeeId === '' || password === '') { 
      dispatch(alert_message('Please full both fields.'))
      return 
    }

    const response = await authentication.sign_in(employeeId, password)

    if (response) {
      dispatch(user_sign_in(response))
      navigate('/dashboard')
    } else {
      dispatch(alert_message('Invalid Credentials.')) 
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