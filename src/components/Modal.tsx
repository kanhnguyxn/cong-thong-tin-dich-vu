'use client'
import React from "react";
import {  Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface BasicModalProps {
    button: string | JSX.Element;
    buttonClassName?: object;
    children: JSX.Element ;
    childrenClassName?: string | object;
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 10,
    width: 'fit-content',
  };

export default function BasicModal ({button, children, buttonClassName,childrenClassName,...props }:BasicModalProps){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        console.log("open");
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return(
        <>
            <Button sx={{...buttonClassName}} onClick={handleOpen}>
                {button}
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            >
                <Box sx={{...style, childrenClassName}}>
                    <Typography>
                        {children}
                    </Typography>
                </Box>
            </Modal>
        </>
       
    )
}