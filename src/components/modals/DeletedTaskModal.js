import { useState } from "react";
import { Box,Modal } from "@mui/material";
import UpdatedItem from "../profile/UpdatedItem";
import modalStyle from "./style-modal";

export default function DeletedTaskModal(props) {
  const [open, setOpen] = useState(true);
  const closeModalHandler=()=>{
    setOpen(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={modalStyle}>
        <UpdatedItem message='Task deleted.'/>
        </Box>
      </Modal>
    </div>
  );
}
