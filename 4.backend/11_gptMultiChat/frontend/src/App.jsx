import React, { useEffect } from 'react'
import Home from './pages/Home'
import MainRoutes from './routes/MainRoutes'
import { useDispatch} from 'react-redux'
import { isUserLoginAction } from './store/actions/authAction'

const App = () => {
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isUserLoginAction())
  }, [])
  return (
    <div>
      <MainRoutes/>
    </div>
  )
}

export default App