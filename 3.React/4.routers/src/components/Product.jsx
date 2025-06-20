import React from 'react'
import { useNavigate } from 'react-router-dom'





const ProductCard = ({ProductName}) =>{

    const navigate = useNavigate();

    const handleNavigate = (Name)=>{
    
      navigate(`/product/details/${Name}`)
    }

  return<div className='w-1/6 aspect-2/3 border rounded-b-md p-2'>
      <div className='w-full aspect-square bg-gray-100 rounded-md mb-2'></div>
      <p className='text-white font-medium text-xl -mb-2'>{ProductName}</p>
      <button onClick={()=>handleNavigate(ProductName)} className='bg-gray-200 text-black rounded-md px-4 py-2 hover:bg-gray-100 text-lg cursor-pointer mb-2'>View</button>
    </div>

}

const Product = () => {
  
  const data = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"]

  return (
    <div>
      <h1 className='text-6xl mb-5 font-thin text-white text-left border-b pb-2 w-fit px-2 rounded-b-2xl'>Products</h1>

      <div className='w-full flex gap-5 flex-wrap'>
        {data.map((ProductName)=>
        < ProductCard key={ProductName} ProductName={ProductName} />
        )}
      </div>

    </div>
  )
}

export default Product