import * as React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { myFirebaseUrl } from "../../util/myFirebase";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UserDataContext from "../../store/userData-context";
import UpdatedItem from "./UpdatedItem";
import ErrorUpdateProfileForm from "./ErrorUpdateProfileForm";
import UpdatingForm from "./UpdatingForm";
import modalStyle from "../modals/style-modal";

const UpdateProfileForm = (props) => {
  const ctxUserData = useContext(UserDataContext);

  const [position, setPosition] = useState(ctxUserData.userPosition);
  const [birthday, setBirthday] = useState(ctxUserData.userBirthday);
  const [hasPositionError, setHasPositionError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasError, setHasError] = useState(false);
  let errorMessage = "Try again later";

  const validatePosition = (argPosition) => {
    // return argPosition.match("^[A-Za-z]")
    return /^[A-Za-z\s]*$/.test(argPosition);
  };
  //TODO: validate input, set error and loading
  const changeHandler = (event) => {
    setPosition(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      //TODO: validate inputs...
      if (!validatePosition(position) || position === "") {
        setHasPositionError(true);
        throw "Position field can only contain letters and spaces.";
      }
      const uid = ctxUserData.userUID;
      const DATE = new Date(birthday);
      const datestring =
        ("0" + (DATE.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + DATE.getDate()).slice(-2) +
        "/" +
        DATE.getFullYear();
      await axios.patch(myFirebaseUrl + "users/" + uid + ".json", {
        position: position ? position : "",
        birthday: datestring ? datestring : "",
      });
      ctxUserData.addPosition(position ? position : "");
      ctxUserData.addBirthday(datestring ? datestring : "");
      setIsUpdated(true);
      // props.closeModalOnSubmit();
    } catch (error) {
      errorMessage += " " + { error };
      setIsUpdating(false);
      setHasError(true);
    }
  };
  let content = (
    <Box sx={modalStyle}>
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        align="center"
        sx={{ fontWeight: "bold", paddingBottom: "20px" }}
      >
        Update Your info
      </Typography>

      <Grid
        container
        spacing={1}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="#9F4298"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Position:
          </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            variant="filled"
            size="small"
            defaultValue={ctxUserData.userPosition}
            onChange={changeHandler}
            type="text"
            id="position"
            sx={{
              backgroundColor: "#E6E7E8",
              border: "3px solid #CFDB31",
              "&:hover": {
                border: "3px solid #9F4298",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={9}>
          {hasPositionError ? (
            <Typography
              variant="h5"
              color={"red"}
              sx={{ fontWeight: "bold", paddingBottom: "20px" }}
            >
              Position field can only contain letters and spaces.
            </Typography>
          ) : null}
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="#9F4298"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Date:
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                minDate={dayjs("01-01-1950")}
                maxDate={dayjs("01-01-2005")}
                value={dayjs(birthday)}
                onChange={(newBirthday) => setBirthday(dayjs(newBirthday))}
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
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={props.closeModalOnSubmit}
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
            CANCEL
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="medium"
            onClick={handleSubmit}
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
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  if (isUpdating) {
    content = (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  if (isUpdated) {
    content = (
      <Box sx={modalStyle}>
        <UpdatedItem />
      </Box>
    );
  }
  if (hasError && !hasPositionError) {
    content = (
      <Box sx={modalStyle}>
        <ErrorUpdateProfileForm message={errorMessage} />
      </Box>
    );
  }
  return content;
};
export default UpdateProfileForm;
