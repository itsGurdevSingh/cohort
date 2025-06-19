import React, { useState } from 'react'
import AddUser from './conponents/AddUser'
import RanderUser from './conponents/RanderUser'
import { ToastContainer} from 'react-toastify';



const App = () => {

const [userData, setUserData] = useState([])
 
  return (
    <>
    <ToastContainer position='top-center'/>
    <AddUser userData={userData} setUserData={setUserData} />
    <hr />
    <RanderUser userData={userData} setUserData={setUserData} />
    </>
  )
}

export default App