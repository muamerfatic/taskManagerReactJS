import Box from "@mui/material/Box";
import { Typography, Stack, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { myFirebaseUrl } from "../../../util/myFirebase";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import modalStyle from "../../modals/style-modal";
import { useForm } from "react-hook-form";
import formStyle from "../../forms/style-form";
import { useState, useContext } from "react";
import { makeDateString } from "../../task/new task/TaskFormHelperFunctions";
import UserDataContext from "../../../store/userData-context";
import UpdatingForm from "../../profile/UpdatingForm";
import UpdatedItem from "../../profile/UpdatedItem";
import ErrorUpdateProfileForm from "../../profile/ErrorUpdateProfileForm";

const LogTimeForm = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date(props.task.startDate));
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cancelHandler = () => {
    props.closeThisLogTimeModal();
  };

  const ctxUserData = useContext(UserDataContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSubmitLogTime = async (data) => {
    try {setIsLoading(true);
      const datestring = makeDateString(new Date(selectedDate));
      const task = props.task;
      
      let loggedTimeArray = [...task.loggedTime];
      
      loggedTimeArray.push({ date: datestring, hours: data.hours });
      task.loggedTime = loggedTimeArray;

      const response = await axios.patch(
        myFirebaseUrl + "tasks/" + task.title + ".json",
        {
            loggedTime: loggedTimeArray,
        }
      ); //if ovaj axios okay
      if (response.statusText !== "OK") {
        throw new Error("Something went wrong: " + response.statusText);
      }
      ctxUserData.logTaskTime(task);
      setIsUpdated(true);
    } catch (error) {
      setHasError(error.message);
    }finally{
        setIsLoading(false);
    }
  };
  if (hasError) {
    return (
      <Box sx={modalStyle}>
        <ErrorUpdateProfileForm message={hasError} />
      </Box>
    );
  }

  if (isUpdated) {
    return (
      <Box sx={modalStyle}>
        <UpdatedItem message="Logging time done" />
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
    <form onSubmit={handleSubmit(handleSubmitLogTime)} style={formStyle}>
      <Box sx={{ ...modalStyle, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          color="myFont"
          sx={{ fontWeight: "bold", paddingBottom: "20px" }}
        >
          Log Time for {props.task.title}
        </Typography>

        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent="center"
            >
              <Typography
                variant="h6"
                component="p"
                color="#9F4298"
                sx={{ fontWeight: "bold" }}
              >
                Log hours:
              </Typography>

              <TextField
                label="Hours"
                variant="filled"
                size="small"
                type="number"
                inputProps={{ min: 1, max: 8, style: { textAlign: "center" } }}
                error={errors?.hours}
                helperText={errors?.hours ? errors.hours?.message : ""}
                sx={{
                  backgroundColor: "#E6E7E8",
                  border: "3px solid #CFDB31",
                  "&:hover": {
                    border: "3px solid #9F4298",
                    borderRadius: "12px",
                  },
                }}
                {...register("hours", {
                  required: "Input hours that you want to log in.",
                  pattern: {
                    value: /^[1-8]/i,
                    message: "Must be number between 1 and 8",
                  },
                })}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent="center"
            >
              <Typography
                variant="h6"
                component="p"
                color="#9F4298"
                sx={{ fontWeight: "bold" }}
              >
                Select Date:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={dayjs(selectedDate)}
                    onChange={(newSelectedDate) => {
                      console.log(newSelectedDate);
                      setSelectedDate(dayjs(newSelectedDate));
                    }}
                    minDate={dayjs(props.task.startDate)}
                    sx={{
                      backgroundColor: "#E6E7E8",
                      border: "3px solid #CFDB31",
                      "&:hover": {
                        border: "3px solid #9F4298",
                        borderRadius: "12px",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              spacing={5}
              alignItems={"center"}
              justifyContent="center"
              marginTop={"1rem"}
            >
              <Button
                variant="contained"
                color="error"
                onClick={cancelHandler}
                sx={{
                  color: "#E6E7E8",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "2px solid #CFDB31",
                  "&:hover": {
                    backgroundColor: "orange",
                    border: "3px solid #9F4298",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
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
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
export default LogTimeForm;
