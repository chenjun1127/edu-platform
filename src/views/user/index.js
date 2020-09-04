import React, { useContext } from 'react';
import { AppContext } from '../../hooks/context';
import { getUserById } from '../../api/base';
const User = () => {
  const { state } = useContext(AppContext);
  // const [state, dispatch] = useReducer(loginReducer, initState);
  console.log(state);
  const handleClick = () => {
    getUserById({ id: 1 }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <button onClick={handleClick}>click</button>
    </>
  );
};
export default User;
