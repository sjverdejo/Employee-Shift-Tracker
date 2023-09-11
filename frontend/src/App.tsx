/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './hooks/redux-hooks'
import SignInPage from './pages/SignInPage'
import auth from './services/authentication'
import { user_sign_in } from './features/userSlice'

const App = () => {

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    auth.signed_in()
      .then(res => {
        if (res) {
          dispatch(user_sign_in(res))
        } else {
          console.log('Logged out')
        }
      })
      .catch(err => console.log(err))
      console.log(user)
  }, [])

  return (
    <>
      <h1>Hi</h1>
        <SignInPage />
      {user.is_signed_in && <h2>Test</h2>}
      <button onClick={() => console.log(user)}>test</button>
    </>
  )
}

export default App
