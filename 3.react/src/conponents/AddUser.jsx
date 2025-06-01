import React, { useState } from 'react'

const AddUser = (props) => {

const {userData,setUserData} = props

const [username, setUsername] = useState('');
const [age, setAge] = useState('');

const changeHandlerName = (e)=>{
  setUsername(e.target.value);
  // console.log(e.value)
}
const changeHandlerAge = (e)=>{
  setAge(e.target.value);
  // console.log(e.value)
}
  const handleSubmit = (e)=> {
    e.preventDefault();

    setUserData([...userData,{username,age}]);
    setAge('');
    setUsername('');
  }     

  return (
    <form action="">
    <input type="text" name="username" placeholder='usename...' id="" value={username}  onChange={changeHandlerName}/>
    <input type="text" name="username" placeholder='usename...' id="" value={age}  onChange={changeHandlerAge}/>
    <button type='submit' onClick={handleSubmit}>click</button>
    </form>

  )
}

export default AddUser