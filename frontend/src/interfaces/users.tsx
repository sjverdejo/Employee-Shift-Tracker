
export interface UserInterface {
  is_admin: boolean | null,
  e_ID: string,
  is_signed_in: boolean
}

export interface LoginInterface {
  employeeId: string,
  password: string
}