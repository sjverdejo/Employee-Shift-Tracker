
const base_url: string = 'http://localhost:3001'

interface loginInfo {
  employeeId: string,
  password: string
}
const sign_in = async (employeeId: string, password: string) => {
  console.log(employeeId, password)

  const login: loginInfo = {
    employeeId,
    password
  }
  const response = await fetch(`${base_url}/api/auth/login/password`, {
    method: 'POST',
    body: JSON.stringify(login)
  })

  if (!response.ok) { throw new Error('Could not fetch.')}
  console.log(response.json())
  return response.json()
}

export default { sign_in }