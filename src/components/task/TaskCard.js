import { Box } from "@mui/material";
import TaskForm from "./new task/TaskForm";
import EditTaskForm from "./task edit/EditTaskForm";

const TaskCard = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "45px auto",
        textAlign: "center",
        width: "85%",
        border: "2px solid #9F4298",
        borderRadius: "12px",
      }}
    >
      {props.editingTask ? <EditTaskForm title={props.title} /> : <TaskForm />}
    </Box>
  );
};
export default TaskCard;
