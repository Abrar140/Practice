
// import React, { useState } from 'react';
// import './SignUp.css';

// function Signup() {
//   const [fullName, setFullName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignUpButton = (event) => {
//     event.preventDefault(); 

//     if (password === confirmPassword) {
//       if(password === ''){
//         alert('Password cannot be empty'); 
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         alert('Password has been set successfully');
//         setPassword('');
//         setConfirmPassword('');
//       }
//     } else {
//       alert('Passwords do not match');
//       setPassword('');
//       setConfirmPassword('');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className='body'>
//       <form className='box'>
//         <div className='input-container'>
//           <label className='input-label'>Full Name</label>
//           <input 
//             type="text" 
//             className='set-name' 
//             value={fullName} 
//             onChange={(e) => setFullName(e.target.value)} 
//           />
//         </div>
//         <div className='input-container'>
//           <label className='input-label'>Date of Birth</label>
//           <input 
//             type="date" 
//             className='confirm-dateofbirth' 
//             value={dateOfBirth} 
//             onChange={(e) => setDateOfBirth(e.target.value)} 
//           />
//         </div>
//         <div className='input-container password-container'>
//           <label className='input-label'>Password</label>
//           <input 
//             type={showPassword ? "text" : "password"} 
//             className='set-password' 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//           <span 
//             className='toggle-password-visibility' 
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? '🙈' : '👁️'}
//           </span>
//         </div>
//         <div className='input-container'>
//           <label className='input-label'>Confirm Password</label>
//           <input 
//             type="password" 
//             className='confirm-password' 
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//           />
//         </div>
//         <div className='input-container'>
//           <label className='input-label'>Email</label>
//           <input 
//             type="email" 
//             className='confirm-email' 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//         </div>
//         <input 
//           type="submit" 
//           value="Sign Up" 
//           className='SignUp-button'
//           onClick={handleSignUpButton} 
//         />
//       </form>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from 'react';
import './SignUp.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSignUpButton = (event) => {
    event.preventDefault(); 

    if (password === confirmPassword) {
      if(password === ''){
        alert('Password cannot be empty'); 
        setPassword('');
        setConfirmPassword('');
      } else {
        alert('Password has been set successfully');
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      alert('Passwords do not match');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOtp = () => {
    // Here you would add your logic to send the email with the OTP
    // For this example, we will simply show the OTP input field
    if (email === '') {
      alert('Please enter an email address.');
    } else {
      alert('OTP has been sent to your email.');
      setShowOtpInput(true);
    }
  };

  return (
    <div className='body'>
      <form className='box'>
        <div className='input-container'>
          <label className='input-label'>Full Name</label>
          <input 
            type="text" 
            className='set-name' 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
        </div>
        <div className='input-container'>
          <label className='input-label'>Date of Birth</label>
          <input 
            type="date" 
            className='confirm-dateofbirth' 
            value={dateOfBirth} 
            onChange={(e) => setDateOfBirth(e.target.value)} 
          />
        </div>
        <div className='input-container password-container'>
          <label className='input-label'>Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            className='set-password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span 
            className='toggle-password-visibility' 
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className='input-container'>
          <label className='input-label'>Confirm Password</label>
          <input 
            type="password" 
            className='confirm-password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <div className='input-container'>
          <label className='input-label'>Email</label>
          <input 
            type="email" 
            className='confirm-email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button type="button" className='send-otp-button' onClick={handleSendOtp}>Send OTP</button>
        </div>
        {showOtpInput && (
          <div className='input-container'>
            <label className='input-label'>OTP</label>
            <input 
              type="text" 
              className='otp-input' 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
          </div>
        )}
        <input 
          type="submit" 
          value="Sign Up" 
          className='SignUp-button'
          onClick={handleSignUpButton} 
        />
      </form>
    </div>
  );
}

export default Signup;
