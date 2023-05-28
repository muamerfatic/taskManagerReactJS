import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import modalStyle from "../modals/style-modal";
import LogTimeForm from "../mytasks/logTime/LogTimeForm";

export default function LogTimeModal(props) {
  const [open, setOpen] = useState(props.showThisLogTimeModal);

  return (
    <div>
      <Modal
        open={open}
        onClose={props.closeThisLogTimeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <LogTimeForm
            task={props.task}
            closeThisLogTimeModal={props.closeThisLogTimeModal}
          />
        </Box>
      </Modal>
    </div>
  );
}
