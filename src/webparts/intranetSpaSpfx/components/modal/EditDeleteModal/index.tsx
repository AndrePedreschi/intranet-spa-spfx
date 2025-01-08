import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import CloseIcon from "../../../assets/close.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TEditDeleteDialogProps = {
  title: string;
  deleteMsg: string;
  openModal: boolean;
  handleConfirm: () => void;
  closeModal: () => void;
};

export const EditDeleteModal = ({
  title,
  deleteMsg,
  openModal,
  handleConfirm,
  closeModal,
}: TEditDeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };

  const confirmAction = () => {
    setOpen(false);
    handleConfirm();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <img src={CloseIcon} alt="closeIcon" />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>{deleteMsg}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={confirmAction}>Confirmar</Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
