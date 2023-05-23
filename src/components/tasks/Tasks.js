import { myFirebaseUrl } from "../../util/myFirebase";
import { Box } from "@mui/material";
import ErrorPage from "../../pages/ErrorPage";
import modalStyle from "../modals/style-modal";
import {  useContext, } from "react";
import UserDataContext from "../../store/userData-context";
import axios from "axios";
import UpdatingForm from "../profile/UpdatingForm";
import Task from "../task/Task";
import TasksContext from "../../store/tasks-context";
import TasksList from "../task/TasksList";

const Tasks = () => {
  const ctxUserData = useContext(UserDataContext);

  if (ctxUserData.error) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={ctxUserData.error} />
      </Box>
    );
  }

  if (ctxUserData.isLoading) {
    console.log('HEJ LOADINGSSSS')
    return (
      //   <Box sx={modalStyle}>
      <UpdatingForm />
      //   </Box>
    );
  }

  return <TasksList tasks={ctxUserData.tasks} />;
};
export default Tasks;
