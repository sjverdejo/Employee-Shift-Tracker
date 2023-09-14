
export interface ShiftInterface {
  id: string | null
  scheduled_start: Date | null
  scheduled_end: Date | null
  scheduled_hours: number | null
  clock_in: Date | null
  clock_out: Date | null
  employee: string | null
}

export interface NewShift {
  scheduled_start: Date
  scheduled_end: Date
  scheduled_hours: number
}

export interface PartialEmployeeInterface {
  id: string | null
  fname: string | null
  lname: string | null
}