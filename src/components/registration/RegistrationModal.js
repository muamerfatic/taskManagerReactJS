import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegistrationForm from "./RegistrationForm";
import modalStyle from "../modals/style-modal";

export default function RegistrationModal(props) {
  const [open, setOpen] = useState(props.showThisRegModal);
  const closeModalOnSubmitHandler = () => {
    setOpen(false);
    props.closeModalOnSubmit();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={props.closeThisRegModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <RegistrationForm closeModalOnSubmit={closeModalOnSubmitHandler} />
        </Box>
      </Modal>
    </div>
  );
}
