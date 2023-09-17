//Validate input
export const validEmployee = (is_admin: string, password: string, fname: string, lname: string,
  dob: Date, date_employed: Date, email: string, phone: number) => {
    if (!is_admin || password || fname || lname || dob || date_employed || email || phone) {
      return false
    }

    //Validate passwords
    if (password.length < 6 || password.includes(' ')) {
      return false
    }

    const birthyear = new Date(dob)
    const current = new Date()
    const dateEmployed = new Date(date_employed)
    //legal age to work in canada is 14
    if ((current.getFullYear() - birthyear.getFullYear()) < 14) {
      return false
    }

    if (dateEmployed.getDate() > current.getDate()) {
      return false
    }


    return true
}