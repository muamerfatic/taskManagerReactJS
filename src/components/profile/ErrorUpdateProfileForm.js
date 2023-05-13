import { Typography, Grid } from "@mui/material";
const ErrorUpdateProfileForm = (props) => {
  return (
    <Grid
      container
      spacing={1}
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5" color="red" sx={{ fontWeight: "bold" }}>
        AN ERROR HAS OCCURRED: {props.message}
      </Typography>
    </Grid>
  );
};
export default ErrorUpdateProfileForm;
