import { Box } from "@mui/material";
import ErrorPage from "../../pages/ErrorPage";
import modalStyle from "../modals/style-modal";
import {  useContext, useEffect,useState } from "react";
import UserDataContext from "../../store/userData-context";
import UpdatingForm from "../profile/UpdatingForm";
import TasksList from "../task/display task/TasksList";

const MyTasks = () => {
  const ctxUserData = useContext(UserDataContext);

  if (ctxUserData.error) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={ctxUserData.error} />
      </Box>
    );
  }

  if (ctxUserData.isLoading) {
    return (
      <UpdatingForm />
    );
  }

  return <TasksList tasks={ctxUserData.myTasks} />;
};
export default MyTasks;
