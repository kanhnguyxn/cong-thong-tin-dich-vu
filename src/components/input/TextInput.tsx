

const placeholderClassName = "placeholder:text-red-500 placeholder:font-bold placeholder:italic placeholder:text-sm placeholder:opacity-100";
const fieldErrorClassName = "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50";

// error hiện cho input
//erro hiện cho field
const TextField = ({name,label, type, placeholder, className, error,...props}) => {
  return (
    <div className={`relative ${className.containerClassName}`}>
      {label && typeof label === "string" ? (
        <label htmlFor={name} className={className.labelClassName}>{label}</label>
      ) : (
        label
      )}
      <input 
        type={type || "text"}
        name={name}
        id={name}
        placeholder={placeholder? placeholder : error.inputError ? error.inputError : ""}
        className={`${className.inputClassName} ${error.fieldError ? placeholderClassName : ""}`}
        {...props}
      />
      {error.fieldError && <span className={fieldErrorClassName}>{error.fieldError}</span>}
    </div>
  )
}