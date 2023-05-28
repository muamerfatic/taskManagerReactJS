import updatingDone from "../../values/pictures/UpdatingDone.png";
import { Avatar, Typography, Grid } from "@mui/material";
const UpdatedItem = (props) => {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
    >
      <Typography variant="h5" color="#03fc4e" sx={{ fontWeight: "bold" }}>
        {props.message}
      </Typography>
      <Avatar src={updatingDone} alt="DonePhoto" />
    </Grid>
  );
};
export default UpdatedItem;
