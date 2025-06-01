import React, { useEffect } from "react";

const RanderUser = (props) => {
  const { userData } = props;

  useEffect(() => {
    renderUser();
  }, [userData]);


  const renderUser = () => {
    return userData.map((data, index) => (
      <li key={index}>
        <span>{data.username}</span> : <span>{data.age}</span>
      </li>
    ));
  };
  return <ul>{renderUser()}</ul>;
};

export default RanderUser;
