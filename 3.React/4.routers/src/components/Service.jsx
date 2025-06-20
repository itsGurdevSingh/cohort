import React from 'react'
import {Outlet, useNavigate } from 'react-router-dom'

const Service = () => {
const navigate = useNavigate();

  return (
    <div>
      <h1 className='text-6xl mb-5 font-thin text-white text-left border-b pb-2 w-fit px-2 rounded-b-2xl'>Services</h1>

        <div onClick={()=>navigate('/service/getService')} className='text-2xl bg-gray-200 text-gray-800 px-4 py-2 rounded-md mb-2 w-fit'> Get Service </div>


      <hr />

      <Outlet />

    </div>
  )
}

export default Service