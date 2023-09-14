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

export interface FullEmployeeInterface {
  id: string | null
  is_admin: boolean | null
  fname: string | null
  lname: string | null
  dob: Date | null
  date_employed: Date | null
  email: string | null
  phone: string | null
}