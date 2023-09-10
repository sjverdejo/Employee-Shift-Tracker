
const base_url: string = 'http://localhost:3001'

interface loginInfo {
  employeeId: string,
  password: string
}

//Sign in service
const sign_in = async (employeeId: string, password: string) => {
  const login: loginInfo = {
    employeeId,
    password
  }

  const response = await fetch(`${base_url}/api/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })

  if (response) {
    if (!response.ok) { throw new Error('Could not fetch.')}
    console.log('response', await response.json())
  } 
  //set state here
}

//Check if signed in service
const check_sign_in_status = async () => {
  const response = await fetch(`${base_url}/api/auth/login`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response) {
    if (!response.ok) { throw new Error('Could not fetch.')}
    //if response is logged in or not
    //update state here if logged in or now
  }
}

//Sign out service
const sign_out = async () => {
  const response = await fetch(`${base_url}/api/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response) {
    if (!response.ok) { throw new Error('Could not fetch.')}
    //if response is logged in or not
    //update state here if logged in or now
    //if response status ok, set state to loggedout and not authenticated
  }
}

export default { sign_in, check_sign_in_status, sign_out }