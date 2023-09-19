import { useAppSelector } from '../../hooks/redux-hooks'
import AdminDash from './AdminDash'
import EmployeeDash from './EmployeeDash'

const Dashboard = () => {
  const user = useAppSelector((state) => state.user)


  return (
    <>
      {user.is_admin ? <AdminDash /> : <EmployeeDash />}
    </>
  )
}

export default Dashboard