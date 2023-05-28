import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Grid, Typography, MenuItem, Box, Stack,Button } from "@mui/material";
import { useContext, useCallback } from "react";
import UserDataContext from "../../../store/userData-context";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { myFirebaseUrl } from "../../../util/myFirebase";
import modalStyle from "../../modals/style-modal";
import ErrorPage from "../../../pages/ErrorPage";
import UpdatingForm from "../../profile/UpdatingForm";
import DatePickerWrapper from "../../UI/DatePickerWrapper";
import tasksFieldFormStyle from "../style-tasks-field-form";
import {
  makeDateString,
  statusDataHandler,
  priorityDataHandler,
  statusReverseDataHandler,
  priorityReverseDataHandler,
} from '../new task/TaskFormHelperFunctions'
import TaskFormSelect from "../new task/TaskFormSelect";
import { useEffect } from "react";
import UpdatedItem from "../../profile/UpdatedItem";

const EditTaskForm = (props) => {
  const ctxUserData = useContext(UserDataContext);

  const [task, setTask] = useState({});

  const [status, setStatus] = useState(1);
  const [priority, setPriority] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [usersEmail, setUsersEmail] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");
  const [possibleEstimation, setPossibleEstimation] = useState("");

  const [userError, setUserError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hasError, setHasError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();

  const updatedClickHandler = () => {
    navigate(`/tasks/${props.title}`);
  };

  const cancelHandler = () => {
    navigate(`/tasks/${props.title}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  //so I can validate assigned user
  const fetchAllUsers = useCallback(async () => {
    try {
      const responseUsers = await axios.get(myFirebaseUrl + "users.json");
      if (responseUsers.statusText !== "OK") {
        throw new Error("Something went wrong: " + responseUsers.statusText);
      }

      const users = await responseUsers.data;
      const usersEmail = [];
      //za svaki user, izvadi email i ubaci ga
      for (const userUID in users) {
        const responseUser = await axios.get(
          myFirebaseUrl + "users/" + userUID + ".json"
        );
        if (responseUser.statusText !== "OK") {
          throw new Error("Something went wrong: " + responseUser.statusText);
        }
        const user = await responseUser.data;
        usersEmail.push(user.email);
      }
      setUsersEmail(usersEmail);
    } catch (error) {
      console.log(error.message);
      setHasError(error.message);
    }
  }, []);

  const getCurrentTask = useCallback(() => {
    for (const counter in ctxUserData.tasks) {
      if (ctxUserData.tasks.at(counter).title === props.title) {
        setTask(ctxUserData.tasks.at(counter));
        setStatus(
          statusReverseDataHandler(ctxUserData.tasks.at(counter).status)
        );
        setPriority(
          priorityReverseDataHandler(ctxUserData.tasks.at(counter).priority)
        );
        setStartDate(ctxUserData.tasks.at(counter).startDate);
        setDueDate(ctxUserData.tasks.at(counter).dueDate);
        setAssignedUser(ctxUserData.tasks.at(counter).assignedUser);
        setPossibleEstimation(ctxUserData.tasks.at(counter).possibleEstimation);
        break;
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCurrentTask();
    fetchAllUsers();
    setIsLoading(false);
  }, [fetchAllUsers, getCurrentTask]);
  
  const assignedUserChangeHandler = (event) => {
    setAssignedUser(event.target.value);
  };

  const possibleEstimationChangeHandler = (event) => {
    setPossibleEstimation(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmitEditingTask = async (data) => {
    try {
        setIsLoading(true);
      let statusData = statusDataHandler(status);
      let priorityData = priorityDataHandler(priority);

      const startDateString = makeDateString(new Date(startDate));
      const dueDateString = makeDateString(new Date(dueDate));

      if (assignedUser === "") {
        throw new Error("Please Enter Assigned User Email!");
      }
      let validUser = false;
      for (const user in usersEmail) {
        if (usersEmail.at(user) === assignedUser) {
          validUser = true;
          break;
        }
      }
      if (!validUser) {
        throw new Error("User with entered email does not exist!");
      }

      console.log('due datee',dueDateString)
      console.log('start date',startDateString)
      if (dueDateString < startDateString) {
        throw new Error("Due date can not be lower then start date!");
      }
      setDateError("");
      setUserError("");
      const taskForUpdate = {
        creator: ctxUserData.userEmail,
        title: props.title,
        status: statusData,
        priority: priorityData,
        description: task.description,
        possibleEstimation,
        startDate: startDateString,
        dueDate: dueDateString,
        assignedUser,
        loggedTime:task.loggedTime
      };
      const response = await axios.patch(
        myFirebaseUrl + "tasks/" + props.title + ".json",
        taskForUpdate
      );
      if (response.statusText !== "OK") {
        throw new Error("Something went wrong: " + response.statusText);
      }
      ctxUserData.updateTask(taskForUpdate);
      setIsUpdated(true);
    } catch (err) {
      if (
        err.message === "User with entered email does not exist!" ||
        err.message === "Please Enter Assigned User Email!"
      ) {
        setUserError(err.message);
      } else if (err.message === "Due date can not be lower then start date!") {
        setUserError('')
        setDateError(err.message);
      } else {
        setHasError(err.message);
      }
    }
    finally{
        setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <Box sx={modalStyle}>
        <ErrorPage message={hasError} />
      </Box>
    );
  }
  if (isUpdated) {
    return (
      <Box sx={modalStyle}>
        <UpdatedItem message='Editing done' />
        <Button
          variant="contained"
          size="medium"
          onClick={updatedClickHandler}
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
          Go Back To Task
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
    <div>
      <form onSubmit={handleSubmit(handleSubmitEditingTask)}>
        <Typography
          variant="h4"
          component="h1"
          color="myFont"
          margin={"10px"}
          sx={{ fontWeight: "bold" }}
        >
          Edit Task: {props.title}
        </Typography>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Title"
              variant="filled"
              size="medium"
              multiline
              margin="normal"
              disabled={true}
              defaultValue={props.title}
              error={errors?.title}
              helperText={errors?.title ? errors.title?.message : ""}
              sx={tasksFieldFormStyle}
            />

            <TaskFormSelect
              inputLabelId="select-status-label"
              id="Status"
              value={status}
              defaultValue={status}
              onChange={statusChangeHandler}
            >
              <MenuItem value={2}>COMPLETED</MenuItem>
              <MenuItem value={1}>ACTIVE</MenuItem>
              <MenuItem value={0}>NOT ACTIVE</MenuItem>
            </TaskFormSelect>

            <TaskFormSelect
              inputLabelId="select-priority-label"
              id="Priority"
              value={priority}
              defaultValue={priority}
              onChange={priorityChangeHandler}
            >
              <MenuItem value={2}>HIGH</MenuItem>
              <MenuItem value={1}>MEDIUM</MenuItem>
              <MenuItem value={0}>LOW</MenuItem>
            </TaskFormSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Description"
              variant="filled"
              multiline
              minRows={4}
              margin="normal"
              defaultValue={task.description}
              disabled={true}
              sx={tasksFieldFormStyle}
              {...register("description")}
            />
            <TextField
              label="Possible Estimation"
              variant="filled"
              multiline
              minRows={4}
              margin="normal"
              type="text"
              value={possibleEstimation}
              onChange={possibleEstimationChangeHandler}
              defaultValue={task.possibleEstimation}
              sx={tasksFieldFormStyle}
            />
          </Grid>
          <Grid item xs={7} md={4}>
            <Typography
              variant="p"
              component="p"
              color="#9F4298"
              align="center"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              START DATE:
            </Typography>
            <DatePickerWrapper
              minDate={dayjs(new Date())}
              value={dayjs(startDate)}
              onChange={(newStartDate) => {
                setStartDate(newStartDate);
              }}
            />

            <Typography
              variant="p"
              component="p"
              color="#9F4298"
              align="center"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              DUE DATE:
            </Typography>

            <DatePickerWrapper
              minDate={dayjs(new Date())}
              value={dayjs(dueDate)}
              onChange={(newDueDate) => {
                setDueDate(newDueDate);
              }}
            />
            {dateError ? <Typography color="red">{dateError}</Typography> : ""}
           
            <Grid item md={9} xs={12}>
              <TextField
                multiline
                label="Assigned User"
                variant="filled"
                size="medium"
                margin="normal"
                type="text"
                onChange={assignedUserChangeHandler}
                value={assignedUser}
                defaultValue={task.assignedUser}
                sx={tasksFieldFormStyle}
              />
              {userError ? (
                <Typography color="red">{userError}</Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              margin: "2rem",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={cancelHandler}
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
              CANCEL
            </Button>

            <Button
              variant="contained"
              color="success"
              type="submit"
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
              SUBMIT
            </Button>
          </Stack>
        </Grid>
      </form>
    </div>
  );
};
export default EditTaskForm;
