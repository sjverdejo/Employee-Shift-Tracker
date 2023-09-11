//interface for a user object
export interface UserInterface {
  is_admin: boolean | null,
  e_ID: string,
  is_signed_in: boolean
}

//interface for sign in object
export interface LoginInterface {
  employeeId: string,
  password: string
}