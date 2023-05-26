import NavigationBar from "../components/navigationBar/NavigationBar";
import TaskCard from "../components/task/TaskCard";
import ErrorPage from "./ErrorPage";
import UserDataContext from "../store/userData-context";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import UpdatingForm from "../components/profile/UpdatingForm";
import modalStyle from "../components/modals/style-modal";
import { useParams } from "react-router-dom";

const EditTaskPage = () => {
  const params = useParams();
  const ctxUserData = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const validateParamsTaskTitle = () => {
    for (const counter in ctxUserData.tasks) {
      if (ctxUserData.tasks.at(counter).title === params.taskTitle) {
        setIsLoading(false);
        setIsValid(true);
        break;
      }
      setIsLoading(false);
      setIsValid(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    validateParamsTaskTitle();
  }, [ctxUserData.tasks]);

  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  if (!isValid) {
    return <ErrorPage message="Edit page doesn't exist"></ErrorPage>;
  }
  return (
    <>
      <NavigationBar />
      <TaskCard editingTask={true} title={params.taskTitle} />
    </>
  );
};
export default EditTaskPage;
