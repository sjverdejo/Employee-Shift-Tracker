import { useAppSelector } from '../../hooks/redux-hooks'
import CommonNav from './CommonNav'
import NavLink from './NavLink'

const EmployeeNav = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <div className='text-stone-200 flex space-x-10'>
      <CommonNav />
      <NavLink page={`/shifts/${user.e_ID}`} text='Shifts' />
    </div>
  )
}

export default EmployeeNav