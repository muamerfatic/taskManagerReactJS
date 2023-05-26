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
import { useTranslation } from "react-i18next";
import { makeDateString } from "../task/new task/TaskFormHelperFunctions";

const UpdateProfileForm = (props) => {
  const { t } = useTranslation();
  const ctxUserData = useContext(UserDataContext);

  const [position, setPosition] = useState(ctxUserData.userPosition);
  const [birthday, setBirthday] = useState(ctxUserData.userBirthday);
  const [hasPositionError, setHasPositionError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasError, setHasError] = useState(false);
  let errorMessage = t("updateProfileForm.part1");

  const validatePosition = (argPosition) => {
    return /^[A-Za-z\s]*$/.test(argPosition);
  };

  const changeHandler = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      if (!validatePosition(position) || position === "") {
        throw t("updateProfileForm.part2");
      }
      const uid = ctxUserData.userUID;
      const datestring = makeDateString(new Date(birthday));

      await axios.patch(myFirebaseUrl + "users/" + uid + ".json", {
        position: position ? position : "",
        birthday: datestring ? datestring : "",
      });

      ctxUserData.addPosition(position ? position : "");
      ctxUserData.addBirthday(datestring ? datestring : "");
      setIsUpdated(true);
    } catch (error) {
      if (error === t("updateProfileForm.part2")) {
        setHasPositionError(error);
      }
      setHasError(true);
    }
  };

  //error with firebase
  if (hasError && !hasPositionError) {
    return (
      <Box sx={modalStyle}>
        <ErrorUpdateProfileForm message={errorMessage} />
      </Box>
    );
  }
  if (isUpdated) {
    return (
      <Box sx={modalStyle}>
        <UpdatedItem />
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
    <Box sx={{ ...modalStyle, textAlign: "center" }}>
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        sx={{ fontWeight: "bold", paddingBottom: "20px" }}
      >
        {t("profile.part4")}
      </Typography>

      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="#9F4298"
            sx={{ fontWeight: "bold" }}
          >
            {t("profile.part3")}
          </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            variant="filled"
            size="small"
            defaultValue={ctxUserData.userPosition}
            onChange={changeHandler}
            type="text"
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
              {hasPositionError}
            </Typography>
          ) : null}
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="#9F4298"
            sx={{ fontWeight: "bold" }}
          >
            {t("updateProfileForm.part3")}
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
            {t("updateProfileForm.part4")}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="success"
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
            {t("register.part11")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UpdateProfileForm;
