import React, { useRef, useState } from "react";
import './otp.css'
function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="otp">
      <h2>OTP Verification</h2>
      <p>Enter 4 digit code</p>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            type="text"
            maxLength={1}
            value={digit}
            autoFocus={index === 0}
            ref={(ref) => (inputRef.current[index] = ref)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <button className="btn"> simply</button>
    </div>
  );
}

export default Otp;
