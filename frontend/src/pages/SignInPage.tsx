/* eslint-disable @typescript-eslint/no-unused-vars */
import SignInForm from '../components/authentication/SignInForm'
import { useAppSelector } from '../hooks/redux-hooks'

const SignInPage = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      <SignInForm />
    </>
  )
}

export default SignInPage