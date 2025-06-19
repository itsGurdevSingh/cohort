import React, { useState } from 'react'
import AddUser from './conponents/AddUser'
import RanderUser from './conponents/RanderUser'



const App = () => {

const [userData, setUserData] = useState([])
 
  return (
    <>
    <AddUser userData={userData} setUserData={setUserData} />
    <hr />
    <RanderUser userData={userData} setUserData={setUserData} />
    </>
  )
}

export default App