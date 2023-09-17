import { Link } from 'react-router-dom'
const NavLink = ({page, text}: {page:string, text: string}) => {
  return (
    <Link className='focus:bg-stone-200 focus:text-stone-950 w-24 focus:rounded-xl focus:shadow-xl text-center' to={page}>{text}</Link>
  )
}

export default NavLink