
import React from 'react'

import Nav from "./components/nav"
import MainRoutes from "./components/MainRoutes"

const App = () => {
  return (

    <div className='w-screen h-screen bg-gray-600 text-white text-center text-8xl font-extrabold p-10'>
      <Nav />
      <MainRoutes />
    
    </div>
  )
}

export default App