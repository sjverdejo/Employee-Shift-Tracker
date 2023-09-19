import { Link, useRouteError } from "react-router-dom";
import HomeImg from '../../assets/background.jpg'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-t from-stone-200 to-stone-100 bg-center' style={{backgroundImage: `url(${HomeImg})`}}>
      <div className='bg-gradient-to-b to-stone-200 from-blue-200 rounded-xl shadow-xl text-blue-950 border-1 border-stone-400 flex justify-center items-center flex-col w-1/3 h-1/3'>
        <h1 className='text-6xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link to='/dashboard'><button className='p-1 mt-5 bg-blue-950 px-10 text-stone-200 rounded-lg shadow-xl'>Return Home</button></Link>
      </div>
    </div>
  );
}