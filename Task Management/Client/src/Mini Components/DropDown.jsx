import React from "react";

function DropDown({
  label = "",
  name = "",
  options = [],
  isRequired = false,
  className = "",
  Inputclassname = "",
  value = "",
  placeholder = "",
  objects = false,
  onchange = () => {},
}) {
  return (
    <div className={`px-[15%] flex flex-col mb-3 ${Inputclassname}`}>
      <label htmlFor={name} className="text-left">
        {label}
      </label>

      <select
        id={name}
        label={label}
        className={`border-2 border-primary-light rounded w-full h-10 text-secondary-dark ${className}`}
        value={value}
        name={name}
        required={isRequired}
        onChange={onchange}
      >
        <option value="" disabled>
          {placeholder || `Select ${label}`}
        </option>

        {objects
          ? options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          : options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
      </select>
    </div>
  );
}

export default DropDown;



// {options.length > 0 ? (
//   options.map((option, index) => (
//     <option
//       key={index}
//       value={objects ? option.id : option} // Use `option.id` if `objects` is true
//     >
//       {objects ? option.name : option} // Use `option.name` if `objects` is true
//     </option>
//   ))
// ) : (
//   <option value="" disabled>
//     No options available
//   </option>
// )}


// {options.map(option => (
//   <option key={option.id} value={option.id}>
//     {option.name}
//   </option>
// ))}
