import { clear_message } from '../../features/alertMsgSlice'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'

const ShowAlert = () => {
  const alert = useAppSelector((state) => state.alertMsg)
  const dispatch = useAppDispatch()
  return (
    <div className='z-20 fixed bg-gradient-to-b from-stone-200 to-stone-400 max-w-sm mx-auto inset-x-0 top-1/3 h-32 flex flex-col items-center justify-center rounded-xl shadow-xl space-y-2'>
      <h3 className='text-2xl'>{alert.message}</h3>
      <button className='p-2 bg-gradient-to-b from-stone-950 to-blue-950 w-1/3 rounded-md shadow-xl text-stone-200' onClick={() => dispatch(clear_message(''))}>Okay</button>
    </div>
  )
}

export default ShowAlert