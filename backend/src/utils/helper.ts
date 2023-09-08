interface userObject {
  is_admin: boolean
  password: string
  fname: string
  lname: string
  dob: Date
  date_employed: Date
  email: string
  phone: string
}

//check if user is missing a field
const validUser = (user: userObject) => {
  if ((user.is_admin !== null) && (user.password && user.fname && user.lname
    && user.dob && user.date_employed && user.email && user.phone)) {
      return true
    } else {
      return false
    }
}

export default { validUser }