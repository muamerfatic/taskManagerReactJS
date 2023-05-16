import { Box } from "@mui/material";
import MyTasks from "./MyTasks";

const MyTasksCard = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "45px auto",
        paddingBottom:'0.5rem',
        textAlign: "center",
        width: "85%",
        border: "2px solid #9F4298",
        borderRadius: "12px",
      }}
    >
        <h1>My Tasks</h1>
        <MyTasks/>
    </Box>
  );
};
export default MyTasksCard;
