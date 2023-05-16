import NavigationBar from "../components/navigationBar/NavigationBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TasksPage = () => {
  const navigate = useNavigate();
  const newTaskHandler = () => {
    navigate("/newTask");
  };
  return (
    <div>
      <NavigationBar />
      <h1>Tasks</h1>
      <Button variant="contained" onClick={newTaskHandler}>
        Add New Task
      </Button>
    </div>
  );
};
export default TasksPage;
