import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { myFirebaseUrl } from "../../util/myFirebase";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const UpdateProfileForm = (props) => {
    const [position, setPosition] = useState(props.position);
    const [birthday, setBirthday] = useState("");

    // const validatePosition=()
    
    const changeHandler = (event) => {
        setPosition(event.target.value);
        console.log(position);
      };
      
  const handleSubmit = async () => {
    try {
      //TODO: validate inputs...
      const uid = JSON.parse(localStorage.getItem("userData")).uid;

      const DATE = new Date(birthday);
      const datestring =
        ("0" + (DATE.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + DATE.getDate()).slice(-2) +
        "/" +
        DATE.getFullYear();

      const response = await axios.patch(
        myFirebaseUrl + "users/" + uid + ".json",
        {
          position,
          birthday: datestring,
        }
      );
      props.updatePosition(position);
      props.updateBirthday(datestring);
      props.closeModalOnSubmit();
    } catch (error) {
      console.error(error);
    }
  };  
  return (
    <Box sx={style}>
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
            margin="normal"
            color="purple"
            defaultValue={position}
            onChange={changeHandler}
            // required
            type="text"
            id="position"
            sx={{
              backgroundColor: "#E6E7E8",
              border: "3px solid #CFDB31",
              "&:hover": {
                border: "3px solid purple",
                borderRadius: "12px",
              },
            }}
          />
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
        <Grid item xs={9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                minDate={dayjs("01-01-1950")}
                maxDate={dayjs("01-01-2005")}
                value={birthday}
                onChange={(newBirthday) => setBirthday(dayjs(newBirthday))}
                sx={{
                  backgroundColor: "#E6E7E8",
                  border: "3px solid #CFDB31",
                  "&:hover": {
                    border: "3px solid purple",
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
              border: "2px solid var(--yellowish)",
              margin: "1rem",
              padding: "1rem",
              "&:hover": {
                backgroundColor: "orange",
                color: "lightPurple)",
                border: "3px solid purple",
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
              border: "2px solid var(--yellowish)",
              margin: "1rem",
              padding: "1rem",
              "&:hover": {
                backgroundColor: "green",
                color: "lightPurple)",
                border: "3px solid purple",
              },
            }}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UpdateProfileForm;
