import CommonNav from './CommonNav'
import NavLink from './NavLink'
const AdminNav = () => {
  return (
    <div className='text-stone-200 flex space-x-10'>
      <CommonNav />
      <NavLink page='/dashboard/employees' text='Employees' />
      <NavLink page='/dashboard/shifts' text='Shifts' />
    </div>
  )
}

export default AdminNav