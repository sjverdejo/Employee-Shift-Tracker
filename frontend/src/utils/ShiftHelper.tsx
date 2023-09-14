const getDifference = (start: Date, end: Date) => {
  //Formula to get hour diffrence between two days
  let difference =(end.getTime() - start.getTime()) / 1000
  difference /= (60 * 60)
  return Math.abs(difference)
}

export default {
  getDifference
}