
export default function SignInForm(props: any) {
  return (
    <>
      <form action={props.loginHandler}>
        <label>Employee ID: </label>
        <input />
        <label>Password: </label>
        <input />
        <input type='submit' value='Sign In' />
      </form>
    </>
  )
}