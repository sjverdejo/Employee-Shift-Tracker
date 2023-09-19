import { Link } from 'react-router-dom'

const AdminDash = () => {
  return (
    <div className='h-screen bg-center flex flex-col justify-center items-center space-y-10'>
      <h1 className='text-6xl text-center text-blue-950'>Welcome To Company Home Page!</h1>
      <div className='flex justify-center items-center text-xl text-white space-x-2'>
        <Link to={`/employee/new`}><button className='p-2 mt-5 bg-gradient-to-t from-stone-900 to-blue-950 w-96 rounded-lg shadow-xl'>Add a New Employee</button></Link>
        <Link to={`/shifts/new`}><button className='p-2 mt-5 bg-gradient-to-t from-stone-900 to-blue-950 rounded-lg shadow-xl w-96 '>Add a New Shift</button></Link>
      </div>
    </div>
  )
}

export default AdminDash