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
    <div className='flex justify-center'>
      <div className='mt-10 w-1/3 h-full bg-gradient-to-b from-stone-950 to-blue-950 rounded-xl shadow-xl text-stone-200'>
      <form onSubmit={submitForm}>
        <div className='p-2 m-10 flex flex-col h-96'>
          <h1 className='text-3xl text-center m-8'>Company Name Here:</h1> 
          <div className='mt-4 flex flex-col space-y-5'>
            <div>
              <label className='block'>Employee ID: </label>
              <input className='w-full text-stone-950' type='text' value={employeeId} onChange={({target}) => setEmployeeId(target.value)}/>
            </div>
            <div>
              <label className='block'>Password</label>
              <input className='w-full text-stone-950' type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
            </div>
          </div>
          <button type='submit' className='mt-5 bg-blue-200 text-stone-950 rounded-sm shadow-xl'>Sign In</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default SignInForm