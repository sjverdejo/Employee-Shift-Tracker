/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './hooks/redux-hooks'
import SignInPage from './pages/SignInPage'
import auth from './services/authentication'
import { user_sign_in, user_sign_out } from './features/userSlice'
import NavBar from './components/navigation/NavBar'

const App = () => {

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const logout = () => {
    auth.sign_out()
      .then(res => dispatch(user_sign_out()))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    auth.signed_in()
      .then(res => {
        if (res) {
          dispatch(user_sign_in(res))
        } else {
          dispatch(user_sign_out())
        }
      })
      .catch(err => console.log(err))
      console.log(user)
  }, [])

  return (
    <>
      <NavBar />
      {user.is_signed_in ? <Outlet /> : <SignInPage />}
      <button onClick={() => console.log(user)}>test</button>
      <button onClick={logout}>Log out</button>
    </>
  )
}

export default App
