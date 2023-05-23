import NavigationBar from "../components/navigationBar/NavigationBar";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserDataContext from "../store/userData-context";
import TasksCard from "../components/tasks/TasksCard";
import ButtonAddTask from "../components/UI/ButtonAddTask";
const TasksPage = () => {
  const navigate = useNavigate();
  const newTaskHandler = () => {
    navigate("/newTask");
  };

  const ctxUserData = useContext(UserDataContext);
  console.log(ctxUserData);
  console.log(ctxUserData.tasks);
  return (
    <>
      <NavigationBar />

      <ButtonAddTask newTaskHandler={newTaskHandler}/>

      <TasksCard />
    </>
  );
};
export default TasksPage;
