import React, { useState } from "react";
import { nanoid } from 'nanoid'

const AddUser = (props) => {
  const { userData, setUserData } = props;

  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const changeHandlerName = (e) => {
    setUsername(e.target.value);
  };
  const changeHandlerAge = (e) => {
    setAge(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = nanoid();
    setUserData([...userData, { username, age,id }]);
    setAge("");
    setUsername("");
  };

  return (
    <form action="" className="flex
     flex-col gap-1 ml-10 pt-20 mr-auto  w-1/3">
      <input
        type="text"
        name="username"
        placeholder="usename..."
        id=""
        value={username}
        className="px-1 py-1 border-b m-2 "
        onChange={changeHandlerName}
      />
      <input
        type="text"
        name="age"
        placeholder="age..."
        id=""
        value={age}
        className="px-1 py-1 border-b m-2 "
        onChange={changeHandlerAge}
      />
      <button type="submit" onClick={handleSubmit} className="px-4 py-2 border rounded-sm mb-2">
        click
      </button>
    </form>
  );
};

export default AddUser;
