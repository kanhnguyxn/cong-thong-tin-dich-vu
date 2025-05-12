type ButtonFormItem = {
  label: string;
  type: "submit" | "button" | "reset";
  variants: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  loading?: boolean;
  sx?: React.CSSProperties;
  onClick?: () => void;
};
