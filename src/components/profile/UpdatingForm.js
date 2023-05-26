import { Typography, Grid } from "@mui/material";
import ReactLoading from "react-loading";
const UpdatingForm = () => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          color="#9F4298"
          sx={{ fontWeight: "bold", paddingBottom: "20px" }}
        >
          UPDATING
        </Typography>
      </Grid>
      <Grid item xs={3} alignContent={"center"}>
        <ReactLoading
          textalign={"center"}//mora biti textalign, a ne textAlign
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      </Grid>
    </Grid>
  );
};
export default UpdatingForm;
