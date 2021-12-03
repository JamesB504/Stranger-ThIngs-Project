import React, { useState } from "react";

const API_ROOT = `https://strangers-things.herokuapp.com/api/2108-LSU-RM-WEB-PT/users/`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h4> Register</h4>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="password" placeholder="password"></input>
        <button type="submit"> Register</button>
      </form>
    </>
  );
};

export default Register;
