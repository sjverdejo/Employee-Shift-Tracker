import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'

const Dashboard = () => {
  const user = useAppSelector((state) => state.user)

  return (
    <>
      <h1>{user.e_ID}</h1>
      <Outlet />
    </>
  )
}

export default Dashboard