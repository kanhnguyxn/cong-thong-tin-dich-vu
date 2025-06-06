"use client";

import FormMui from "@components/form/Form";
import { Box, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "600px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

interface FormModal {
  title: string | React.ReactNode; // Title can be a string or a React node
  inputSchema?: Array<unknown>; // Define the type based on your schema
  handleSubmit?: (data: object | null) => void; // Define the type based on your form data
  buttons?: Array<ButtonFormItem>;
  editData?: object;
}

export default function FormModal({ title, inputSchema = [], handleSubmit, buttons = [], editData = {} }) {
  return (
    <Box sx={style} className="flex flex-col">
      <Typography variant="h6" {...titleStyles} sx={{ color: "black" }}>
        {title}
      </Typography>
      <FormMui
        editData={editData}
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        orientation="horizontal"
        className="flex flex-col gap-2 md:gap-3"
        buttons={buttons}
        buttonClassName="flex flex-row justify-around"
      />
    </Box>
  );
}
