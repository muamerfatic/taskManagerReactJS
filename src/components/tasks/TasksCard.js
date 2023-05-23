import { Box, Typography } from "@mui/material";
import Tasks from "./Tasks";

const TasksCard = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "45px auto",
        paddingBottom: "0.5rem",
        textAlign: "center",
        width: "85%",
        border: "2px solid #9F4298",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        sx={{ fontWeight: "bold", padding: "0.8rem" }}
      >
        All tasks
      </Typography>

      <Tasks />
    </Box>
  );
};
export default TasksCard;
