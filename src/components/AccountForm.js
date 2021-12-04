import React, { useState } from "react";

const API_REGISTER = `https://strangers-things.herokuapp.com/api/2108-LSU-RM-WEB-PT/users/register`;

const AccountForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`user name: ${username}`);
    console.log(`password: ${password}`);
    try {
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });

      const { data } = await response.json();
      // console.log(data);
      const token = data.token;
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h4> Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit"> Register</button>
      </form>
    </>
  );
};

export default AccountForm;
