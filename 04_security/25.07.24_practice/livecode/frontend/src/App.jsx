import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  /* Creating states for form input handling */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* Creating a state for displaying a welcome message  */
  const [welcomeMessage, setWelcomeMessage] = useState('');
  /* Creating a state for storing the logged in user after a successful login */
  const [userLoggedIn, setUserLoggedIn] = useState({});

  /* sendData is our "fetch" request handler function. 
  It uses axios to make requests (only POST requests in this case).
  

*/

  const sendData = async ({ name = '', email, password, path }) => {
    /* The name,email,password,and path values are destructured from the object we passed to the sendData  function in our submitHandlers ( either 'registerHandler', either 'loginHandler') */
    console.log(name, email, password, path);

    const { data } = await axios.post(
      /* making the path dynamic based on wich submitHandler itwas coming from makes it easier not having to repeat code and write different axios requests based on their purpose */
      `http://localhost:3000/users/${path}`,
      path === 'register' ? { name, email, password } : { email, password }
    );

    /* if the path was login the expected response includes a 'user' object, we are setting that object as the value of the logged in user state  */
    if (path === 'login') {
      setUserLoggedIn(data.user);
    }
    /* in both cases of 'path' (register or login), the response includes a message, we are setting that message as the value of the welcomeMessage state */
    setWelcomeMessage(data.message);
  };

  /* Called when the registration form is being submitted */
  const registerHandler = (e) => {
    e.preventDefault();

    /* calling the sendData function and passing the relevant datain to be able to make our axios request */
    sendData({
      name: name,
      email: email,
      password: password,
      path: 'register',
    });
    /* clearing the form inputs */
    setName('');
    setEmail('');
    setPassword('');
  };

  /* Called when the login form is being submitted */
  const loginHandler = (e) => {
    e.preventDefault();
    /* calling the sendData function and passing the relevant datain to be able to make our axios request */
    sendData({
      email: email,
      password: password,
      path: 'login',
    });
    /* clearing the form inputs */
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>

{/* The Welcome message is dynamically set based on what message the response from the backend included */}
      <h1>{welcomeMessage && `${welcomeMessage}`}</h1>
      <h2>{userLoggedIn && userLoggedIn.email}</h2>

      {/* REGISTRATION */}

      <form onSubmit={registerHandler}>
        <h2>Register</h2>
        <label htmlFor='name'>Name</label>
        <input
          type='name'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email_register'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          id='password_register'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' value='Register!' />
      </form>

      {/* LOGIN */}

      <form onSubmit={loginHandler}>
        <h2>Login</h2>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email_login'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          id='password_login'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' value='Login!' />
      </form>
    </>
  );
}

export default App;
