import React, { useState } from 'react'
import AddUser from './conponents/AddUser'
import RanderUser from './conponents/RanderUser'
import { ToastContainer} from 'react-toastify';



const App = () => {

return (
    <>

    <ToastContainer position='top-center'/>
    <AddUser/>
    <hr />
    <RanderUser/>
    </>
  )
}

export default App