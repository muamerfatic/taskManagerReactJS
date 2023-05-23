import { Button } from "@mui/material";
const ButtonAddTask=(props)=>{
return (
    <Button
        variant="contained"
        onClick={props.newTaskHandler}
        color="success"
        sx={{
          position: "fixed",
          top: "6.6rem",
          right: "0.5rem",
          zIndex: "1",
          fontWeight: "bold",
          fontSize: "1.6rem",
          borderRadius: "80px",
          border: "2px solid #9F4298",
          "&:hover": {
            border: "3px solid #9F4298",
          },
        }}
      >
        +
      </Button>
)
}
export default ButtonAddTask;