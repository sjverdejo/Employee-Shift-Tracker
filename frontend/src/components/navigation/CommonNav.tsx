import { useAppSelector } from '../../hooks/redux-hooks'
import NavLink from './NavLink'

const CommonNav = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      <NavLink page='/dashboard' text='Home'/>
      <NavLink page={`/employee/${user.e_ID}`} text='My Profile' />
    </>
  )
}

export default CommonNav