import { Grid, Typography, Box, Stack } from "@mui/material";
import { useContext } from "react";
import UserDataContext from "../../../store/userData-context";
import { useState } from "react";
import modalStyle from "../../modals/style-modal";
import UpdatingForm from "../../profile/UpdatingForm";
import { useEffect } from "react";
import {
  statusColorHandler,
  priorityColorHandler,
} from "../TaskFormHelperFunctions";
import ErrorPage from "../../../pages/ErrorPage";
const TaskDetail = (props) => {
  const ctxUserData = useContext(UserDataContext);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    for (const counter in ctxUserData.tasks) {
      if (ctxUserData.tasks.at(counter).title === props.title) {
        console.log("from props: ", props.title);
        console.log(ctxUserData.tasks.at(counter));
        setTask(ctxUserData.tasks.at(counter));
      }
    }

    setIsLoading(false);
    
  }, [task, props.title, ctxUserData.tasks]);

  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        margin={"1rem"}
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        {task.title}
      </Typography>

      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
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
              Creator:{" "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.creator}
              </Typography>
            </Typography>

            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              Status:
              <Typography variant="p" color={statusColorHandler(task.status)}>
                {" " + task.status}
              </Typography>
            </Typography>

            <Typography variant="p" color="#333333" sx={{ fontWeight: "bold" }}>
              Priority:{" "}
              <Typography
                variant=""
                color={priorityColorHandler(task.priority)}
                sx={{ fontWeight: "bold" }}
              >
                {task.priority}
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
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
              Description:{" "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.description ? task.description : "No description"}
              </Typography>
            </Typography>

            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              Possible estimation:{" "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.possibleestimation
                  ? task.possibleestimation
                  : "No estimation"}
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            spacing={2}
            alignItems={"flex-start"}
            sx={{ marginTop: "0.3rem", marginLeft: "1rem" }}
          >
            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              Start date:{" "}
              <Typography
                variant="p"
                sx={{ fontStyle: "italic", color: "blue" }}
              >
                {task.startDate}
              </Typography>
            </Typography>
            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              Due date:{" "}
              <Typography
                variant="p"
                sx={{ fontStyle: "italic", color: "red" }}
              >
                {task.dueDate}
              </Typography>
            </Typography>
            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              Assigned user:{" "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.assignedUser}
              </Typography>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskDetail;
