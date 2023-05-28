import {
  Grid,
  Button,
  Typography,
  Stack,
  Avatar,
  useMediaQuery,
  Box,
} from "@mui/material";
import {
  priorityColorHandler,
  statusColorHandler,
} from "../new task/TaskFormHelperFunctions";
import { useContext, useState } from "react";
import ErrorPage from "../../../pages/ErrorPage";
import modalStyle from "../../modals/style-modal";
import UpdatingForm from "../../profile/UpdatingForm";
import UserDataContext from "../../../store/userData-context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompletedTaskModal from "../../modals/CompletedTaskModal";

import updatingDone from "../../../values/pictures/UpdatingDone.png";
import LogTimeModal from "../../modals/LogTimeModal";

const Task = (props) => {
  const { t } = useTranslation();
  const isTabletOrMobile = useMediaQuery("(max-width: 390px)");
  const navigate = useNavigate();
  const ctxUserData = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);

  const [showLogTimeModal, setShowLogTimeModal] = useState(false);

  const [isTaskCompleted, setIsTaskCompleted] = useState(
    props.status === "COMPLETED" ? true : false
  );
  const [completingDone, setCompletingDone] = useState(false);

  const isUserAuthorizedToDeleteOrEdit =
    ctxUserData.userEmail === props.assignedUser ||
    ctxUserData.userEmail === props.creator
      ? false
      : true;

  const isUserAuthorizedToLogTimeOrCompleteTask =
    ctxUserData.userEmail === props.assignedUser ? false : true;

  const deleteTaskHandler = () => {
    ctxUserData.deleteTask(props.title);
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

  const taskClickHandler = () => {
    navigate(`/tasks/${props.title}`);
  };

  const logTimeClickHandler = () => {
    setShowLogTimeModal(true);
  };

  const closeLogTimeModal = () => {
    setShowLogTimeModal(false);
  };

  if (ctxUserData.error) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={ctxUserData.error} />
      </Box>
    );
  }

  if (ctxUserData.isLoading || isLoading) {
    return <UpdatingForm />;
  }

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      sx={{
        width: "75%",
        margin: "auto",
        marginBottom: "1rem",
        padding: "0.2rem",
        backgroundColor: "#e2bFe4",
        borderRadius: "12px",
      }}
    >
      <Grid item xs={12} md={7} onClick={taskClickHandler}>
        <Typography variant="h5" color="#333333" sx={{ fontWeight: "bold" }}>
          {t("task.part1")} {props.title}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{ textAlign: "left" }}
        onClick={taskClickHandler}
      >
        <Stack spacing={2} sx={{ marginTop: "0.3rem" }}>
          <Typography variant="p" component="p" sx={{ fontWeight: "bold" }}>
            {t("task.dueDate")}{" "}
            <Typography variant="p" color="red">
              {props.dueDate}
            </Typography>
          </Typography>
          <Typography variant="p" component="p" sx={{ fontWeight: "bold" }}>
            Status:
            <Typography variant="p" color={statusColorHandler(props.status)}>
              {" " + props.status}
            </Typography>
          </Typography>
          <Typography variant="p" component="p" sx={{ fontWeight: "bold" }}>
            {t("task.createdBy")} {props.creator}
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
          color="#E6E7E8"
        >
          <Button
            variant="contained"
            // color="error"
            size="small"
            disabled={isUserAuthorizedToDeleteOrEdit || isTaskCompleted}
            onClick={deleteTaskHandler}
            sx={{
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
            // color="success"
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
      <Grid item xs={12} md={6} onClick={taskClickHandler}>
        <Typography variant="span" sx={{ fontWeight: "bolder" }}>
          {t("task.priority")}
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
      {completingDone ? <CompletedTaskModal /> : ""}
      {showLogTimeModal?<LogTimeModal
          task={props.task}
          showThisLogTimeModal={showLogTimeModal}
          closeThisLogTimeModal={closeLogTimeModal}/>:''}
    </Grid>
  );
};

export default Task;
