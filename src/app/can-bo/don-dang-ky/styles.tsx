export const formControlStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "flex-start",
  gap: "4px",
};

export const customeLabelStyle = {
  color: "black",
  display: "contents",
  fontWeight: 500,
};

export const typeClassNameMap: Record<string, string> = {
  text: "rounded-none !mb-0 !px-2 !py-2 border-[var(--color-blue)]",
  radio: "rounded-none !mb-0 !px-2 !py-2 border-none !fit-content",
  "checkbox-group": "rounded-none !mb-0 !px-2 !py-2 border-none !fit-content",
};

export const buttonStyles = {
  backgroundColor: "var(--color-blue)",
  color: "white",
  width: {
    xs: "50px",
    sm: "100px",
    md: "150px",
    lg: "200px",
  },
  borderRadius: "15px",
};
