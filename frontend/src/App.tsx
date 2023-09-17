/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './hooks/redux-hooks'
import SignInPage from './pages/SignInPage'
import auth from './services/authentication'
import { user_sign_in, user_sign_out } from './features/userSlice'
import NavBar from './components/navigation/NavBar'
import { alert_message } from './features/alertMsgSlice'
import ShowAlert from './components/alerts/ShowAlert'

const App = () => {
  const alert = useAppSelector((state) => state.alertMsg)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const logout = () => {
    if (!user.is_signed_in) {
      dispatch(alert_message('Already signed out.'))
      return
    }

    auth.sign_out()
      .then(_res => dispatch(user_sign_out()))
      .catch(_err => dispatch(alert_message('Unable to sign out.')))
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
      .catch(_err => dispatch(alert_message('Something went wrong.')))
  }, [])

  return (
    <div className='h-screen bg-gradient-to-t from-stone-200 to-stone-100'>
      <NavBar />
      {alert.show && <ShowAlert />}
      {user.is_signed_in ? <Outlet /> : <SignInPage />}
      <button onClick={() => console.log(user)}>test</button>
      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default App
