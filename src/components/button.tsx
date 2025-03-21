import React from "react";

interface ButtonProps {
  className?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  name,
  type = "button",
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  variant = "default",
  children,
}) => {
  // Base classes for the button
  const baseClasses = "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant styles
  const variantClasses =
    variant === "outline"
      ? "hover:bg-gray-50"
      : "hover:bg-blue-700";

  // Disabled class
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type as "button" | "submit" | "reset"}
      name={name}
      className={`${baseClasses} ${variantClasses} ${disabledClass} ${className} px-4 py-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children || name}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
