import { Box} from "@mui/material";
import TaskForm from "./TaskForm";

const TaskCard = () => {
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
      <TaskForm/>
    </Box>
  );
};
export default TaskCard;
