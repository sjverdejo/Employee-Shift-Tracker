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

interface shiftObj {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

//check if shift is missing field
const validShift = (shift: shiftObj) => {
  if (shift.scheduled_end && shift.scheduled_start && shift.scheduled_hours) {
    return true
  } else {
    return false
  }
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

export default { validShift, validUser }