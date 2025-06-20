import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();

  return (
    <div className='p-5 '>
        <div className='text-5xl font-thin '>{params.name}</div>
        <span onClick={()=>navigate(-1)} className='text-2xl bg-gray-200 text-gray-800 px-4 py-2 rounded-md'> Go Back </span>
        

    </div>
  )
}

export default ProductDetails