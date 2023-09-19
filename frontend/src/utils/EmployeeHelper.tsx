//Validate input
export const validEmployee = (is_admin: string, password: string, fname: string, lname: string,
  dob: Date, date_employed: Date, email: string, phone: number) => {
    if (is_admin === null || !password || !fname || !lname || !dob ||!date_employed || !email || !phone) {
      
      return 'Missing an input.'
    }

    //Validate passwords
    if (password.length < 6 || password.includes(' ')) {
      return 'Password has a space or is less than 6 characters.'
    }

    const birthyear = new Date(dob)
    const current = new Date()
    
    //legal age to work in canada is 14
    if ((current.getFullYear() - birthyear.getFullYear()) <= 14) {
      return 'Must be at least 14 or older.'
    }

    return ''
}