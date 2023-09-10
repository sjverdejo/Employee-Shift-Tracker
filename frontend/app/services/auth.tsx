interface loginInfo {
  employeeId: string,
  password: string
}

async function signIn(login: loginInfo) {
  const response = await fetch('http://localhost:3001/api/auth/login/password',
    {
      method: 'POST',
      body: JSON.stringify(login)
    })

  if (!response.ok) { throw new Error('Failed to fetch data')}

  response.json()
}

export default { signIn }