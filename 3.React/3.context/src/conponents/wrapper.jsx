import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const userContext = createContext(null)

const Wrapper = (props) => {

  const [userData, setUserData] = useState([])

  return (
    <userContext.Provider value={[userData, setUserData]}>{props.children}</userContext.Provider>
  )
}

export default Wrapper