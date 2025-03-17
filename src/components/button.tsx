import React from 'react';

interface ButtonProps {
    className?: string;
    name?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    className = '',
    name,
    type = 'button',
    onClick,
    disabled = false,
    startIcon,
    endIcon,
}) => {
    // Base classes for the button
    const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
 
    
    // Disabled class
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    
    return (
        <button
            type={type as "button" | "submit" | "reset"}
            name={name}
            className={`${baseClasses} ${disabledClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {name}
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};

export default Button;