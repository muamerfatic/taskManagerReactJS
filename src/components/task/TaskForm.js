import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Grid, Typography, MenuItem, Box } from "@mui/material";
import { useContext, useCallback } from "react";
import UserDataContext from "../../store/userData-context";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { myFirebaseUrl } from "../../util/myFirebase";
import modalStyle from "../modals/style-modal";
import UpdatedItem from "../profile/UpdatedItem";
import ErrorPage from "../../pages/ErrorPage";
import UpdatingForm from "../profile/UpdatingForm";
import DatePickerWrapper from "../UI/DatePickerWrapper";
import tasksFieldFormStyle from "./style-tasks-field-form";
import {
  makeDateString,
  statusDataHandler,
  priorityDataHandler,
} from "./TaskFormHelperFunctions";
import TaskFormSelect from "./TaskFormSelect";
import { useEffect } from "react";

const TaskForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(1);
  const [priority, setPriority] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasError, setHasError] = useState("");
  const [usersEmail, setUsersEmail] = useState([]);

  const updatedClickHandler = () => {
    navigate("/tasks");
  };
  const ctxUserData = useContext(UserDataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //mode:"onBlur"

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

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  // const onErrors = (errors) => console.error(errors);

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  const priorityChangeHandler = (event) => {
    setPriority(event.target.value);
  };

  const handleAddNewTask = async (data) => {
    try {
      setIsUpdating(true);
      let statusData = statusDataHandler(status);
      let priorityData = priorityDataHandler(priority);

      const startDateString = makeDateString(new Date(startDate));
      const dueDateString = makeDateString(new Date(dueDate));

      const taskForAdd = {
        creator: ctxUserData.userEmail,
        title: data.title,
        status: statusData,
        priority: priorityData,
        description: data.description,
        possibleEstimation: data.possibleEstimation,
        startDate: startDateString,
        dueDate: dueDateString,
        assignedUser: data.assignedUser,
      };
      const response = await axios.patch(
        myFirebaseUrl + "tasks/" + data.title + ".json",
        taskForAdd
      );
      if (response.statusText !== "OK") {
        throw new Error("Something went wrong: " + response.statusText);
      }
      ctxUserData.addTask(taskForAdd);
      setIsUpdated(true);
    } catch (err) {
      setHasError(err.message);
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
        <UpdatedItem />
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
          Go Back To Tasks
        </Button>
      </Box>
    );
  }
  if (isUpdating) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  //   <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>{/* ... */}</form>;
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddNewTask)}>
        <Typography
          variant="h4"
          component="h1"
          color="myFont"
          margin={"10px"}
          sx={{ fontWeight: "bold" }}
        >
          New Task
        </Typography>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Title"
              variant="filled"
              size="medium"
              margin="normal"
              type="text"
              error={errors?.title}
              helperText={errors?.title ? errors.title?.message : ""}
              sx={tasksFieldFormStyle}
              {...register("title", {
                required: "Please Enter Your Title",
                pattern: {
                  value: /^[A-Za-z0-9\-\_]*$/i,
                  message: "Only letters, numbers and underscore are allowed.",
                },
                validate: (match) => {
                  for (const task in ctxUserData.tasks) {
                    console.log(ctxUserData.tasks.at(task).title, "===", match);
                    if (match === ctxUserData.tasks.at(task).title) {
                      return "This title of task is already taken. Please give your task diffrent title.";
                    }
                  }
                  return true;
                },
              })}
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
              type="text"
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
              sx={tasksFieldFormStyle}
              {...register("possibleEstimation")}
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
            <Grid item md={9} xs={12}>
              <TextField
                label="Assigned User"
                variant="filled"
                size="medium"
                margin="normal"
                type="text"
                error={errors?.assignedUser}
                helperText={
                  errors?.assignedUser ? errors.assignedUser?.message : ""
                }
                sx={tasksFieldFormStyle}
                {...register("assignedUser", {
                  required: "Please Enter Assigned Users Email!",
                  validate: (match) => {
                    for (const user in usersEmail) {
                      if (usersEmail.at(user) === match) {
                        return true;
                      }
                    }
                    return "User with entered email does not exist!";
                  },
                })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            color: "#E6E7E8",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "2px solid #CFDB31",
            margin: "1rem",
            "&:hover": {
              backgroundColor: "green",
              border: "3px solid #9F4298",
            },
          }}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};
export default TaskForm;
