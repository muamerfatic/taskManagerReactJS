import { myFirebaseUrl } from "../../util/myFirebase";
import { Box } from "@mui/material";
import ErrorPage from "../../pages/ErrorPage";
import modalStyle from "../modals/style-modal";
import { useEffect, useContext, useState, useCallback } from "react";
import UserDataContext from "../../store/userData-context";
import axios from "axios";
import UpdatingForm from "../profile/UpdatingForm";
import Task from "../task/Task";
import MyTasksList from "./MyTasksList";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctxUserData = useContext(UserDataContext);
  let content='';
  const fetchTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseTitles = await axios.get(myFirebaseUrl + "tasks" + ".json");
      if (responseTitles.statusText !== "OK") {
        throw new Error("Something went wrong: " + responseTitles.statusText);
      }

      const titles = await responseTitles.data;
      const tasksOfThisCreator = [];
      //za svaki title of task, izvadi creatora i uporedi jel to taj
      for (const title in titles) {
        const responseTask = await axios.get(
          myFirebaseUrl + "tasks/" + title + ".json"
        );
        if (responseTask.statusText !== "OK") {
          throw new Error("Something went wrong: " + responseTask.statusText);
        }
        const task = await responseTask.data;
        if (task.creator === ctxUserData.userEmail) {
          tasksOfThisCreator.push(task);
        }
      }
      console.log(tasksOfThisCreator);
      setTasks(tasksOfThisCreator);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTasksHandler();
  }, [fetchTasksHandler]);

  if (error) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={error} />
      </Box>
    );
  }

  if (isLoading) {
    return (
      //   <Box sx={modalStyle}>
      <UpdatingForm />
      //   </Box>
    );
  }

  return (
   <MyTasksList tasks={tasks}/>
  );
};
export default MyTasks;
