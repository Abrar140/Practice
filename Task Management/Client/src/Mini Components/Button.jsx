import React from "react";

function Button({
  label = "Button",
  type = "button",
  className = "",
  inputclassname = "",
  disabled = false,
  onclick = () => {},
}) {
  return (
    <div className={`mb-5 px-[15%] ${inputclassname}`}>
      <button type={type} className={`bg-primary text-secondary-light rounded w-[100%] hover:bg-secondary-light hover:text-primary border-2 border-primary h-10 ${className}`} disabled={disabled}     onClick={onclick}>
        {label}
      </button>
    </div>
  );
}

export default Button;
