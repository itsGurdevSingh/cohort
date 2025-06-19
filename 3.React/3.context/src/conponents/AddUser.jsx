import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid'
import {toast } from 'react-toastify';
import { useContext } from 'react'
import { userContext } from "./wrapper";

const AddUser = () => {


  const [userData, setUserData] = useContext(userContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 
  const Submit = (data) => {
    const id = nanoid();
    data.id=id;
    setUserData([...userData, data]);
    console.log(userData);
    toast.success("form submited")
    reset();
  };

  return (
    <form action="" className="flex
     flex-col gap-1 ml-10 pt-20 mr-auto  w-1/3">
      <input
        type="text"
        {...register('username')}
        placeholder="username..."
        className="px-1 py-1 border-b m-2 "
        
      />
      <input
        type="text"
        {...register('age')}
        placeholder="age..."
        className="px-1 py-1 border-b m-2 "
        />
      <button type="submit" onClick={handleSubmit(Submit)} className="px-4 py-2 border rounded-sm mb-2">
        click
      </button>
    </form>
  );
};

export default AddUser;
