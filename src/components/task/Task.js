import {
  Grid,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  Box,
} from "@mui/material";
import {
  priorityColorHandler,
  statusColorHandler,
} from "./TaskFormHelperFunctions";
import { useContext } from "react";
import ErrorPage from "../../pages/ErrorPage";
import modalStyle from "../modals/style-modal";
import UpdatingForm from "../profile/UpdatingForm";
import UserDataContext from "../../store/userData-context";
import { useNavigate } from "react-router-dom";
const Task = (props) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 390px)");
  const navigate = useNavigate();
  const ctxUserData = useContext(UserDataContext);
  const deleteTaskHandler = () => {
    console.log("saljem ti ", props.title);
    ctxUserData.deleteTask(props.title);
  };

  const taskClickHandler = () => {
    navigate(`/tasks/${props.title}`);
  };

  console.log(ctxUserData.isLoading);

  if (ctxUserData.error) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={ctxUserData.error} />
      </Box>
    );
  }

  if (ctxUserData.isLoading) {
    console.log("OVDJE...");
    return (
      //   <Box sx={modalStyle}>
      <UpdatingForm />
      //   </Box>
    );
  }

  const isUserAuthorizedToDeleteOrEdit =
    ctxUserData.userEmail === props.assignedUser ||
    ctxUserData.userEmail === props.creator
      ? false
      : true;

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignContent="center"
      sx={{
        width: "75%",
        margin: "auto",
        marginBottom: "1rem",
        padding: "0.2rem",
        backgroundColor: "#e2bFe4",
        borderRadius: "12px",
      }}
    >
      <Grid item xs={12} md={7}
      
      onClick={taskClickHandler}>
        <Typography variant="h5" color="#333333" sx={{ fontWeight: "bold" }}>
          Task: {props.title}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} sx={{ textAlign: "left" }}
      
      onClick={taskClickHandler}>
        <Stack
          spacing={2}
          alignItems={"flex-start"}
          sx={{ marginTop: "0.3rem" }}
        >
          <Typography
            variant="p"
            component="p"
            color="#333333"
            sx={{ fontWeight: "bold" }}
          >
            Due Date:{" "}
            <Typography variant="p" color="red">
              {props.dueDate}
            </Typography>
          </Typography>
          <Typography
            variant="p"
            component="p"
            color="#333333"
            sx={{ fontWeight: "bold" }}
          >
            Status:
            <Typography variant="p" color={statusColorHandler(props.status)}>
              {" " + props.status}
            </Typography>
          </Typography>
          <Typography
            variant="p"
            component="p"
            color="#333333"
            sx={{ fontWeight: "bold" }}
          >
            Created by: {props.creator}
          </Typography>
        </Stack>
      </Grid>
      <Grid
      
        item
        xs={12}
        md={5}
        
        sx={{ textAlign: "right", marginRight: "0.1rem" }}
      >
        <Stack
          spacing={1}
          alignItems={!isTabletOrMobile ? "flex-end" : "center"}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={
              ctxUserData.userEmail === props.assignedUser ||
              ctxUserData.userEmail === props.creator
                ? false
                : true
            }
            onClick={deleteTaskHandler}
            sx={{
              color: "#E6E7E8",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "2px solid #E6E7E8",
              "&:hover": {
                border: "3px solid #9F4298",
              },
            }}
          >
            DELETE
          </Button>
          <Button
            variant="contained"
            color="info"
            disabled={isUserAuthorizedToDeleteOrEdit}
            size="small"
            sx={{
              color: "#E6E7E8",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "2px solid #E6E7E8",
              "&:hover": {
                border: "3px solid #9F4298",
              },
            }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled={isUserAuthorizedToDeleteOrEdit}
            sx={{
              color: "#E6E7E8",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "2px solid #E6E7E8",
              "&:hover": {
                border: "3px solid #9F4298",
              },
            }}
          >
            COMPLETE
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}
      onClick={taskClickHandler}>
        <Typography
          variant="span"
          color="#333333"
          sx={{ fontWeight: "bolder" }}
        >
          PRIORITY:{" "}
          <Typography
            variant=""
            color={priorityColorHandler(props.priority)}
            sx={{ fontWeight: "bolder" }}
          >
            {" "}
            {props.priority}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Task;
