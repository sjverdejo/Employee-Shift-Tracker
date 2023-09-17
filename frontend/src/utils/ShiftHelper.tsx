//Get hour difference between two dates
const getDifference = (start: Date, end: Date) => {
  let difference =(end.getTime() - start.getTime()) / 1000
  difference /= (60 * 60)
  return Math.abs(difference)
}

//Convert to specific format of string
const toYMD = (dateGiven: Date) => {
  const date = new Date(dateGiven)

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

//Check if 2 dates same month and year
const isSameMMYY = (date: Date, date2: Date) => {
  const first = new Date(date)
  const second = new Date(date2)

  if (first.getFullYear() === second.getFullYear()
  && first.getMonth() === second.getMonth()) {
    return true
  } else {
    return false
  }
}

//Check if date given is same day as today
const isShiftAvailable = (dateStart: Date) => {
  const currentDate = new Date()
  const shiftDate = new Date(dateStart)

  if (isSameMMYY(currentDate, shiftDate)
  && currentDate.getDate() === shiftDate.getDate()) {
    return true
  } else {
    return false
  }
}

//Validate employee & dates not empty and dates are valid
const validShift = (dateStart: Date, dateEnd: Date, employee: string) => {
  if (!employee || !dateStart || !dateEnd) {
    return false
  }

  const start = new Date(dateStart)
  const end = new Date(dateEnd)
  const current = new Date()
  if (start > end || end < current) {
    return false
  } else {
    return true
  }
}


export default {
  getDifference, toYMD, isShiftAvailable, validShift
}