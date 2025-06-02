"use client";

import { useMemo, useState } from "react";

import CustomButton from "@components/button";
import { Container } from "@components/Container";
import FormMui from "@components/form/Form";
import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
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
  handleSubmit: (data: unknown) => void; // Define the type based on your form data
  buttons?: Array<ButtonFormItem>;
  buttonLabel?: string;
  variant?: "text" | "outlined" | "contained";
  buttonSize?: "small" | "medium" | "large";
  sx?: object;
  className?: string;
  showCancelButton?: boolean; // Whether to show the cancel button
  customCancelButton?: ButtonFormItem;
  onClose?: () => void; // Custom cancel button if needed
}

export default function FormModal({
  title,
  buttonLabel,
  variant,
  buttonSize,
  sx = {},
  className = "",
  inputSchema = [],
  handleSubmit,
  buttons = [],
  showCancelButton = true, // Whether to show the cancel button
  customCancelButton = null,
  onClose = () => {}, // Custom cancel button if needed
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const formButtons = useMemo(() => {
    return [
      ...buttons,
      showCancelButton
        ? {
            ...customCancelButton,
            onClick: () => {
              setOpen(false);
              onClose && onClose();
            },
          }
        : null,
    ];
  }, [buttons, showCancelButton, customCancelButton, onClose]);

  return (
    <>
      <CustomButton
        label={buttonLabel}
        type="button"
        variants={variant}
        size={buttonSize}
        onClick={() => {
          setOpen(true);
          // Logic to open the form or modal
        }}
        sx={{ backgroundColor: "var(--color-blue)", width: "100%", ...sx }}
        className={`${className}`}
      />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Container
          className="w-[90%]"
          children={
            <>
              <Box sx={style} className="flex flex-col">
                <Typography variant="h6" {...titleStyles} sx={{ color: "black" }}>
                  {title}
                </Typography>
                <FormMui
                  inputSchema={inputSchema}
                  onSubmit={handleSubmit}
                  orientation="horizontal"
                  className="flex flex-col gap-2 md:gap-3"
                  buttons={formButtons}
                  buttonClassName="flex flex-row justify-around"
                />
              </Box>
            </>
          }
        />
      </Modal>
    </>
    // open && (
    //   <div className="fixed inset-0 z-50 bg-[var(--color-gray-light)] w-full">
    //     <Container
    //       className="w-[90%]"
    //       children={
    //         <>
    //           <Box className="flex flex-col">
    //             <Typography variant="h6" {...titleStyles} sx={{ color: "black" }}>
    //               {"Thêm quy định"}
    //             </Typography>
    //             <FormMui
    //               inputSchema={inputSchema}
    //               onSubmit={handleSubmit}
    //               className="flex flex-col gap-2 md:gap-3"
    //               buttons={buttons}
    //               buttonClassName="flex flex-row justify-around"
    //             />
    //           </Box>
    //         </>
    //       }
    //     />
    //   </div>
    // )
  );
}
// {
//           label: "Thêm",
//           type: "submit",
//           variants: "contained",
//           size: "large",
//           sx: {
//             backgroundColor: "var(--color-blue)",
//             width: "40%",
//           },
//         },
