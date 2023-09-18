import { useAppSelector } from '../../hooks/redux-hooks'
import AdminNav from './AdminNav'
import EmployeeNav from './EmployeeNav'

const NavBar = () => {
  const user = useAppSelector((state) => state.user)

  //boolean for if user.is_adnin is not null for conditional rendering of navigation
  const isNotNull = user.is_admin !== null

  return (
    <div className='fixed w-screen bg-gradient-to-t from-stone-900 to-blue-950 h-24 flex justify-between p-8'>
      <h1 className='text-stone-200 text-xl'>Company Name</h1>
      { isNotNull &&
        <nav>
          {user.is_admin ? <AdminNav /> : <EmployeeNav />}
        </nav>
      }
    </div>
  )
}

export default NavBar