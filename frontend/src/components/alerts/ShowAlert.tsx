import { clear_message } from '../../features/alertMsgSlice'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'

const ShowAlert = () => {
  const alert = useAppSelector((state) => state.alertMsg)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h3>{alert.message}</h3>
      <button onClick={() => dispatch(clear_message(''))}>Okay</button>
    </div>
  )
}

export default ShowAlert