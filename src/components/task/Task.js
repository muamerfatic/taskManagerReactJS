import { Grid,Typography } from "@mui/material";
const Task = (props) => {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center"
    sx={{
        width:'75%',
        margin:'auto',
        marginBottom:'1rem',
        padding:'0.2rem',
        backgroundColor:'#e2bFe4',
        borderRadius:'12px'
    }}>
      <Grid item xs={12} md={6}>
        <Typography
          variant="p"
          component="p"
          color="#333333"
          align="left"
          sx={{ fontWeight: "bold"}}
        >
          Task:{props.title}
        </Typography>
        <Typography
          variant="p"
          component="p"
          color="#333333"
          align="left"
          sx={{ fontWeight: "bold"}}
        >
          Created by:{props.creator}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="p"
          component="p"
          color="#333333"
          align="left"
          sx={{ fontWeight: "bold"}}
        >
          Due Date:{props.dueDate}
        </Typography>
        <Typography
          variant="p"
          component="p"
          color="#333333"
          align="left"
          sx={{ fontWeight: "bold" }}
        >
          Status:{props.status}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="p"
          component="p"
          color="#333333"
          align="left"
          sx={{ fontWeight: "bolder"}}
        >
          PRIORITY:{props.priority}
        </Typography>
       
      </Grid>
    </Grid>
  );
};

export default Task;
