const getDifference = (start: Date, end: Date) => {
  //Formula to get hour diffrence between two days
  let difference =(end.getTime() - start.getTime()) / 1000
  difference /= (60 * 60)
  return Math.abs(difference)
}

const toYMD = (dateGiven: Date) => {
  const date = new Date(dateGiven)

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const isShiftAvailable = (dateStart: Date) => {
  const currentDate = new Date()

  const shiftDate = new Date(dateStart)

  if (currentDate.getFullYear() === shiftDate.getFullYear()
  && currentDate.getMonth() === shiftDate.getMonth()
  && (currentDate.getDate() === shiftDate.getDate() - 1 
  || currentDate.getDate() === shiftDate.getDate() + 1 
  || currentDate.getDate() === shiftDate.getDate())) {
    return true
  } else {
    return false
  }
}

//check if shift is complete by if clock in and clock out is complete

export default {
  getDifference, toYMD, isShiftAvailable
}