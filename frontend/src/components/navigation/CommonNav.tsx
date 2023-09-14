import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'

const CommonNav = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      <Link to='/dashboard'>Home</Link>
      <Link to={`/dashboard/profile/${user.e_ID}`}>My Profile</Link>
    </>
  )
}

export default CommonNav