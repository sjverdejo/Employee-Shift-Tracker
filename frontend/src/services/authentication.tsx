import axios from 'axios'
import { LoginInterface, UserInterface } from "../interfaces/users"

const base_url: string = 'http://localhost:3001'

axios.defaults.withCredentials = true

//Sign in service
const sign_in = async (employeeId: string, password: string) => {
  const login: LoginInterface = {
    employeeId,
    password
  }

  const req = await axios.post(`${base_url}/api/auth/login`, login)

  if (req) {
    const user: UserInterface = {
      is_admin: req.data.is_admin,
      e_ID: req.data.e_ID,
      is_signed_in: req.data.authenticated
    } 
    return user
  } else {
    return null
  }
}

//Check if signed in service
const signed_in = async () => {
  const req = await axios.get(`${base_url}/api/auth/logged_in`)

  if (req && req.data.is_signed_in) {
    
    const user: UserInterface = {
      is_admin: req.data.user.is_admin,
      e_ID: req.data.user.e_ID,
      is_signed_in: req.data.user.authenticated
    } 

    return user
  } else {
    return null
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

export default { sign_in, signed_in, sign_out }