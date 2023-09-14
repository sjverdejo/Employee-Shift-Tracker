import { useAppSelector } from '../../hooks/redux-hooks'
import AdminNav from './AdminNav'
import EmployeeNav from './EmployeeNav'

const NavBar = () => {
  const user = useAppSelector((state) => state.user)

  //boolean for if user.is_adnin is not null for conditional rendering of navigation
  const isNotNull = user.is_admin !== null

  return (
    <>
      { isNotNull &&
        <nav>
          {user.is_admin ? <AdminNav /> : <EmployeeNav />}
        </nav>
      }
    </>
  )
}

export default NavBar