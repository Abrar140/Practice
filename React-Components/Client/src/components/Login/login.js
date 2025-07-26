import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkCredentials = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    if (username === "abrar" && password === "1122") {
      alert('Welcome');
      setUsername("");
      setPassword("");
    }
    else{
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className='body'>
      <form className='box'>
        <input 
          type="text" 
          placeholder="Username" 
          className='username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button  className='forgotpassword'> forgotpassword</button>
        <input 
          type="submit" 
          value="Login" 
          onClick={checkCredentials} 
        />
      </form>
    </div>
  );
}

export default Login;
