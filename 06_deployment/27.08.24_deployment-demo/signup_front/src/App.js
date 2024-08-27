import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
 

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email,
      username,
    };

    axios
      .post('https://signup-back.onrender.com/users/signup', data)
      .then((res) => {
        console.log(res);
      });
  };

  

  return (
    <div className='App'>
      <h2>Add user</h2>
      <form action='post' onSubmit={submitHandler}>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          name='username'
          placeholder='username'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type='submit' value='submit' />
      </form>

    
    </div>
  );
}

export default App;






































/*   const getUsers = async () => {
   

   
      const res = await fetch('http://localhost:8000/users');
      // const res = await fetch('https://back-vogx.onrender.com/users');
 
      const data = await res.json();
    
      setUsers(data);
      if (!res.ok) {
        const error = new Error(res.statusText);
        error.status = res.status;
        throw error;
      }
   
  }; */

   {/*  <h2>Get users</h2>
      <button onClick={getUsers}>Get users</button>

      <div>
        {users.length < 1
          ? null
          : users.map((user) => {
              return (
                <p key={user._id}>
                  {user.email}
                  <br />
                </p>
              );
            })}
      </div> */}
