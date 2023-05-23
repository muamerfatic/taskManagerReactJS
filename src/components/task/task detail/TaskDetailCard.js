import { Box } from "@mui/material";
import TaskDetail from "./TaskDetail";

const TaskDetailCard = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor:"#e2bFe4",
        margin: "40px auto",
        padding:'1rem',
        textAlign: "center",
        width: "85%",
        border: "2px solid #9F4298",
        borderRadius: "12px",
      }}
    >
      <TaskDetail title={props.title} />
    </Box>
  );
};
export default TaskDetailCard;
