import React from "react";

function Input({
  label = "",
  name = "",
  type = "text",
  isRequired = false,
  className = "",
  Inputclassname = "",
  value = "",
  placeholder = "",
  checked = false,
  min="",
  onchange = () => {},
  readOnly = false,
}) {
  return (
    <div className={` mb-3 px-[15%]  flex flex-col ${Inputclassname}`}>
      <label htmlFor={name}>{label}</label>
      <input
        label={label}
        id={name}
        name={name}
        type={type}
        className={` border-2 border-primary rounded w-[100%] h-10 ${className}`}
        value={value}
        placeholder={placeholder}
        required={isRequired}
        onChange={onchange}
        checked={checked}
        readOnly={readOnly}
        min={min}
      />
    </div>
  );
}

export default Input;
