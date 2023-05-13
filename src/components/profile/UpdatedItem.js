import updatingDone from "../../values/pictures/UpdatingDone.png";
import { Avatar, Typography, Grid } from "@mui/material";
const UpdatedItem = () => {
  return (
    <Grid
      container
      spacing={1}
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5" color="#03fc4e" sx={{ fontWeight: "bold" }}>
        UPDATING DONE
      </Typography>
      <Avatar src={updatingDone} alt="DonePhoto" />
    </Grid>
  );
};
export default UpdatedItem;
