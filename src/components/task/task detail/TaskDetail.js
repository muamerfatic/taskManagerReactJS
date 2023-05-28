import { Grid, Typography, Box, Stack, Button, Avatar } from "@mui/material";
import { useContext } from "react";
import UserDataContext from "../../../store/userData-context";
import { useState } from "react";
import modalStyle from "../../modals/style-modal";
import UpdatingForm from "../../profile/UpdatingForm";
import { useEffect } from "react";
import {
  statusColorHandler,
  priorityColorHandler,
} from "../new task/TaskFormHelperFunctions";
import DeletedTask from "./DeletedTask";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import updatingDone from "../../../values/pictures/UpdatingDone.png";
import CompletedTaskModal from "../../modals/CompletedTaskModal";
import LogTimeModal from "../../modals/LogTimeModal";

const TaskDetail = (props) => {
  const { t } = useTranslation();

  const ctxUserData = useContext(UserDataContext);
  const [task, setTask] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(
    task.status === "COMPLETED" ? true : false
  );
  const [completingDone, setCompletingDone] = useState(false);
  
  const [showLogTimeModal,setShowLogTimeModal]=useState(false);

  const navigate = useNavigate();

  const isUserAuthorizedToDeleteOrEdit =
    ctxUserData.userEmail === task.assignedUser ||
    ctxUserData.userEmail === task.creator
      ? false
      : true; //false na jednakost jer podesavam disabled prop

  const isUserAuthorizedToLogTimeOrCompleteTask =
    ctxUserData.userEmail === task.assignedUser ? false : true;

  useEffect(() => {
    setIsLoading(true);
    for (const counter in ctxUserData.tasks) {
      if (ctxUserData.tasks.at(counter).title === props.title) {
        setTask(ctxUserData.tasks.at(counter));
        setIsTaskCompleted(task.status === "COMPLETED" ? true : false);
      }
    }
    setIsLoading(false);
  }, [task, props.title, ctxUserData.tasks]);

  const deletedClickHandler = () => {
    navigate("/tasks");
  };

  const deleteTaskHandler = () => {
    props.deleteTask(); //moglo je odma i navigate( na tasks ), ali zelimo da vidimo potvrdu da se obrisalo
    ctxUserData.deleteTask(props.title);
    setIsDeleted(true);
  };

  const editTaskHandler = () => {
    navigate(`/tasks/edit/${props.title}`);
  };

  const completeTaskHandler = () => {
    setIsLoading(true);
    ctxUserData.completeTask(props.title);
    setIsTaskCompleted(true);
    setCompletingDone(true);
    setIsLoading(false);
  };

  const logTimeClickHandler = () => {
    setShowLogTimeModal(true);
  };

  const closeLogTimeModal=()=>{
    setShowLogTimeModal(false);
  }

  if (isDeleted) {
    return (
      <Box sx={modalStyle}>
        <DeletedTask />
        <Button
          variant="contained"
          size="medium"
          onClick={deletedClickHandler}
          sx={{
            color: "#E6E7E8",
            borderRadius: "12px",
            border: "2px solid #03fc4e",
            "&:hover": {
              backgroundColor: "green",
              border: "3px solid #9F4298",
            },
          }}
        >
          {t("task.goBack")}
        </Button>
      </Box>
    );
  }

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
              {t("task.createdBy")}{" "}
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
              {t("task.priority")}
              {": "}
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
              {t("task.description")}
              {": "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.description ? task.description : t("task.noDescription")}
              </Typography>
            </Typography>

            <Typography
              variant="p"
              component="p"
              color="#333333"
              sx={{ fontWeight: "bold" }}
            >
              {t("task.possibleEstimation")}
              {": "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.possibleEstimation
                  ? task.possibleEstimation
                  : t("task.noEstimation")}
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
              {t("task.startDate")}{" "}
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
              {t("task.dueDate")}{" "}
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
              {t("task.assignedUser")}
              {": "}
              <Typography variant="p" sx={{ fontStyle: "italic" }}>
                {task.assignedUser}
              </Typography>
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"center"}
            sx={{
              marginTop: "3rem",
            }}
          >
            <Button
              variant="contained"
              // color="error"
              size="small"
              disabled={isUserAuthorizedToDeleteOrEdit || isTaskCompleted}
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
              {t("task.delete")}
            </Button>
            <Button
              variant="contained"
              // color="info"
              disabled={isUserAuthorizedToDeleteOrEdit || isTaskCompleted}
              onClick={editTaskHandler}
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
              {t("task.edit")}
            </Button>
            <Button
              variant="contained"
              // color="info"
              size="small"
              disabled={
                isUserAuthorizedToLogTimeOrCompleteTask || isTaskCompleted
              }
              onClick={logTimeClickHandler}
              sx={{
                fontWeight: "bold",
                borderRadius: "12px",
                border: "2px solid #E6E7E8",
                "&:hover": {
                  border: "3px solid #9F4298",
                },
              }}
            >
              {t("task.logTime")}
            </Button>
            <Button
              variant="contained"
              // color="success"
              size="small"
              disabled={
                isUserAuthorizedToLogTimeOrCompleteTask || isTaskCompleted
              }
              onClick={completeTaskHandler}
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
              {t("task.complete")}
            </Button>
          </Stack>
        </Grid>
        {isTaskCompleted ? (
          <>
            <Stack
              direction="raw"
              spacing={2}
              marginTop="2rem"
              alignItems={"center"}
            >
              <Typography
                variant="p"
                component="p"
                color="green"
                sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
              >
                TASK IS COMPLETED
              </Typography>

              <Avatar src={updatingDone} alt="Completed" />
            </Stack>
          </>
        ) : (
          ""
        )}
      </Grid>
      {completingDone ? <CompletedTaskModal /> : ""}
      {showLogTimeModal?<LogTimeModal
          task={task}
          showThisLogTimeModal={showLogTimeModal}
          closeThisLogTimeModal={closeLogTimeModal}/>:''}
    </>
  );
};

export default TaskDetail;
