import React, { useEffect } from "react";

const RanderUser = (props) => {
  const { userData,setUserData} = props;

const removerUser = (id)=>{

  let newData = userData.filter(user => user.id != id)
  setUserData(newData);

}

  const renderUser = userData.map((data, index) => {
      return <li className="border px-2 py-1 rounded-sm flex gap-4 bg-slate-50 w-fit" key={index}>
        <span className="text-lg font-bold">{data.username}</span> : <span className="text-md font-semibold ">{data.age}</span>
        <span onClick={()=>removerUser(data.id)} className="rounded bg-red-100 p-1 text-red-500 text-sm">remove</span>
      </li>
    });
  
  return <ul className="ml-10 pt-20 flex flex-col gap-2 ">{renderUser}</ul>;
};

export default RanderUser;
