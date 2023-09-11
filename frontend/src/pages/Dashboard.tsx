import { useAppSelector } from '../hooks/redux-hooks'

const Dashboard = () => {
  const user = useAppSelector((state) => state.user)

  return (
    <>
      <h1>{user.is_admin}</h1>
    </>
  )
}

export default Dashboard