import { Button, colors } from "@mui/material";

type ButtonProps = {
  variants?: "text" | "outlined" | "contained";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  href?: string;
  className?: string;
  onClick?: () => void;
  label?: string;
  type?: "button" | "submit" | "reset";
  sx?: object;
};

export default function CustomButton({
  variants = "contained",
  disabled = false,
  size = "medium",
  sx = {},
  href,
  className = "",
  label = "Button",
  type = "button",
  onClick = () => {},
}: ButtonProps) {
  const defaultSx = {
    fontSize: {
      xs: "12px", // ~text-base
      sm: "14px", // ~text-xl
      md: "16px", // ~text-2xl
      lg: "18px", // ~text-3xl
    },
    color: "white",
    padding: "5px 0px",
    width: "fit-content",
    fontWeight: 600,
    borderRadius: "9999px", // rounded-full
    textTransform: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)", // focus:shadow-outline
    },
    ...sx,
  };

  return (
    <Button
      variant={variants}
      LinkComponent={href ? "a" : undefined}
      disabled={disabled}
      size={size}
      href={href}
      className={className}
      type={type}
      onClick={onClick}
      sx={defaultSx}
    >
      {label}
    </Button>
  );
}
