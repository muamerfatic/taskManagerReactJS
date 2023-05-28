import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Grid, Typography, MenuItem, Box } from "@mui/material";
import { useContext, useCallback } from "react";
import UserDataContext from "../../../store/userData-context";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { myFirebaseUrl } from "../../../util/myFirebase";
import modalStyle from "../../modals/style-modal";
import UpdatedItem from "../../profile/UpdatedItem";
import ErrorPage from "../../../pages/ErrorPage";
import UpdatingForm from "../../profile/UpdatingForm";
import DatePickerWrapper from "../../UI/DatePickerWrapper";
import tasksFieldFormStyle from "../style-tasks-field-form";
import {
  makeDateString,
  statusDataHandler,
  priorityDataHandler,
} from "./TaskFormHelperFunctions";
import TaskFormSelect from "./TaskFormSelect";
import { useTranslation } from "react-i18next";

const TaskForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState(1);
  const [priority, setPriority] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasError, setHasError] = useState("");
  const [usersEmail, setUsersEmail] = useState([]);
  const [dateError, setDateError] = useState("");

  const ctxUserData = useContext(UserDataContext);

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

  const updatedClickHandler = () => {
    navigate("/tasks");
  };

  const handleAddNewTask = async (data) => {
    try {
      setIsUpdating(true);
      let statusData = statusDataHandler(status);
      let priorityData = priorityDataHandler(priority);

      const startDateString = makeDateString(new Date(startDate));
      const dueDateString = makeDateString(new Date(dueDate));

      if (dueDate < startDate) {
        throw new Error(t("error.dateError"));
        // setDateError('Due date can not be lower then start date!')
      }
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
        loggedTime:'',//it will be array
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
      if (err.message === t("error.dateError")) {
        setIsUpdating(false);
        setDateError(err.message);
      } else {
        setHasError(err.message);
      }
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
        <UpdatedItem  message='Task added'/>
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
          {t("task.goBack")}
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
          {t("task.newTask")}
        </Typography>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label={t("task.title")}
              variant="filled"
              margin="normal"
              type="text"
              error={errors?.title}
              helperText={errors?.title ? errors.title?.message : ""}
              sx={tasksFieldFormStyle}
              {...register("title", {
                required: t("task.enterTitle"),
                pattern: {
                  value: /^[A-Za-z0-9\-\_]*$/i,
                  message: t("task.enterTitleError"),
                },
                validate: (match) => {
                  for (const task in ctxUserData.tasks) {
                    console.log(ctxUserData.tasks.at(task).title, "===", match);
                    if (match === ctxUserData.tasks.at(task).title) {
                      return t("task.enterTitleTaken");
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
              label={t("task.description")}
              variant="filled"
              multiline
              minRows={4}
              margin="normal"
              type="text"
              sx={tasksFieldFormStyle}
              {...register("description")}
            />
            <TextField
              label={t("task.possibleEstimation")}
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
              color="primary"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              {t("task.startDate")}
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
              color="primary"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              {t("task.dueDate")}
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
                label={t("task.assignedUser")}
                variant="filled"
                margin="normal"
                type="text"
                error={errors?.assignedUser}
                helperText={
                  errors?.assignedUser ? errors.assignedUser?.message : ""
                }
                sx={tasksFieldFormStyle}
                {...register("assignedUser", {
                  required: t("task.enterAssignedUser"),
                  validate: (match) => {
                    for (const user in usersEmail) {
                      if (usersEmail.at(user) === match) {
                        return true;
                      }
                    }
                    return t("task.assignedUserError");
                  },
                })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
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
          {t("task.addTask")}
        </Button>
      </form>
    </div>
  );
};
export default TaskForm;
