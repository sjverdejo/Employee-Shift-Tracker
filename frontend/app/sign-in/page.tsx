import SignInForm from "../components/auth/SignInForm"

export default function Page() {
  async function login(formData: FormData) {
    'use server'

  }

  return (
    <>
      <SignInForm loginHandler={login} />
    </>
  )
}