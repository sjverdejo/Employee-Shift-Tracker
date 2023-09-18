/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './hooks/redux-hooks'
import SignInPage from './components/authentication/SignInPage'
import auth from './services/authentication'
import { user_sign_in, user_sign_out } from './features/userSlice'
import NavBar from './components/navigation/NavBar'
import { alert_message } from './features/alertMsgSlice'
import ShowAlert from './components/alerts/ShowAlert'
import HomeImg from './assets/background.jpg'
const App = () => {
  const alert = useAppSelector((state) => state.alertMsg)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
          navigate('/')
        }
      })
      .catch(_err => dispatch(alert_message('You have been automatically timed out. Refresh to sign in again.')))
  }, [])

  return (
    <>
    <div className='h-screen bg-gradient-to-t from-stone-200 to-stone-100 bg-center' style={{backgroundImage: `url(${HomeImg})`}} >
      <NavBar />
      {alert.show && <ShowAlert />}
      {user.is_signed_in ? <Outlet /> : <SignInPage />}
      <button className='pb-2 fixed inset-x-0 bottom-0 text-white' onClick={logout}>Log out</button>
    </div>
    </>
    
  )
}

export default App
