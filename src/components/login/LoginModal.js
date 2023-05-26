import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import modalStyle from "../modals/style-modal";

export default function LoginModal(props) {
  const [open, setOpen] = useState(props.showThisLoginModal);

  const closeModalOnSubmitHandler = () => {
    setOpen(false);
    props.closeModalOnSubmit();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={props.closeThisLoginModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <LoginForm closeModalOnSubmit={closeModalOnSubmitHandler} />
        </Box>
      </Modal>
    </div>
  );
}
