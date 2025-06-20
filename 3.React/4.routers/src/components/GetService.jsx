import React from 'react'
import { useNavigate} from 'react-router-dom'

const ProductDetails = () => {
    const navigate = useNavigate();

  return (
    <div className='p-5 '>
        <div className='text-5xl font-thin '>GetService</div>
        <span onClick={()=>navigate(-1)} className='text-2xl bg-gray-200 text-gray-800 px-4 py-2 rounded-md'> Go Back </span>
        

    </div>
  )
}

export default ProductDetails