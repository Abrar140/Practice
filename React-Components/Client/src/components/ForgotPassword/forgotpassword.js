import React, { useState } from 'react';
import './forgotpassword.css';

function Forgotpassword() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    if (newPassword === confirmPassword) {
        if(newPassword==''){
            alert('Password cannot be empty'); 
            setNewPassword("")
            setConfirmPassword("")
        }
        else{
            alert('Password has been changed successfully');
            setNewPassword("")
                  setConfirmPassword("")
        }
      // Add your password update logic here
   
    } else {
      alert('Passwords do not match');
      setNewPassword("")
            setConfirmPassword("")
    }
  };

  return (
    <div className='body'>
      <form className='box'>
       
        <input 
          type="password" 
          placeholder="New Password" 
          className='new-password' 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className='confirm-password' 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <input 
          type="submit" 
          value="Update Password" 
          className='update-password'
          onClick={handleUpdatePassword} 
        />
      </form>
    </div>
  );
}

export default Forgotpassword;
