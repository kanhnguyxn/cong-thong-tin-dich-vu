import { Button, CircularProgress } from "@mui/material";

export type ButtonProps = {
  variants?: "text" | "outlined" | "contained";
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
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
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
    },
    color: "white",
    padding: "5px 12px",
    width: "fit-content",
    fontWeight: 600,
    borderRadius: "9999px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",

    "&:focus": {
      outline: "none",
    },
    ...sx,
  };

  return (
    <Button
      variant={variants}
      LinkComponent={href ? "a" : undefined}
      disabled={disabled || loading}
      size={size}
      href={href}
      className={className}
      type={type}
      onClick={onClick}
      sx={defaultSx}
    >
      {label}
      {loading && <CircularProgress size={16} color="inherit" />}
    </Button>
  );
}
