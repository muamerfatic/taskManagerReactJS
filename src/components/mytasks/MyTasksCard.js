import { Box, Typography } from "@mui/material";
import MyTasks from "./MyTasks";

const MyTasksCard = () => {
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
        Tasks that are assigned to you
      </Typography>

      <MyTasks />
    </Box>
  );
};
export default MyTasksCard;
