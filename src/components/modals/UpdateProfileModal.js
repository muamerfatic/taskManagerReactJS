import * as React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import UpdateProfileForm from "../profile/UpdateProfileForm";

export default function UpdateProfileModal(props) {
  const [open, setOpen] = useState(props.showThisUpdateModal);
  const closeModalOnSubmitHandler = () => {
    setOpen(false);
    props.closeThisUpdateModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={props.closeThisUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateProfileForm
          position={props.position}
          updateBirthday={props.updateBirthday}
          updatePosition={props.updatePosition}
          closeModalOnSubmit={closeModalOnSubmitHandler}
        />
      </Modal>
    </div>
  );
}
