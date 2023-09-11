import { useAppSelector } from '../../hooks/redux-hooks'
import AdminNav from './AdminNav'
import EmployeeNav from './EmployeeNav'

const NavBar = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <nav>
      {user.is_admin ? AdminNav() : EmployeeNav()}
    </nav>
  )
}

export default NavBar