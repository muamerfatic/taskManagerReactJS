import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Registration from "./Registration";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "33%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        <Box sx={style}>
          <Registration closeModalOnSubmit={closeModalOnSubmitHandler} />
        </Box>
      </Modal>
    </div>
  );
}
