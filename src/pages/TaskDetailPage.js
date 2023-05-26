import { useParams } from "react-router-dom";
import NavigationBar from "../components/navigationBar/NavigationBar";
import TaskDetailCard from "../components/task/task detail/TaskDetailCard";
import { useContext, useState, useEffect } from "react";
import UserDataContext from "../store/userData-context";
import ErrorPage from "./ErrorPage";
import UpdatingForm from "../components/profile/UpdatingForm";
import modalStyle from "../components/modals/style-modal";
import { Box } from "@mui/material";
const TaskDetailPage = () => {
  const params = useParams();
  const ctxUserData = useContext(UserDataContext);
  const [deleted, setDeleted] = useState(false);

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
  //dodano jer kad sam obrisao iz onog page, odvede me na error page zbog ovog ispod if-a
  //jer onda fja validateParamsTaskTitle bi vratila false i otislo bi na ErrorPage
  //a kada obrisemo ne zelimo na error page :)
  const deleteTask = () => {
    setDeleted(true);
  };
  useEffect(() => {
    setIsLoading(true);
    validateParamsTaskTitle();
    // setIsLoading(false)
  }, [ctxUserData.tasks]);
  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  if (!isValid && !deleted) {
    return <ErrorPage message="Page doesnt exist"></ErrorPage>;
  }
  return (
    <>
      <NavigationBar />
      <TaskDetailCard title={params.taskTitle} deleteTask={deleteTask} />
    </>
  );
};
export default TaskDetailPage;
