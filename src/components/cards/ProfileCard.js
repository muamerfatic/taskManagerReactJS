import { Button, Grid, Box, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import GridItem from "../UI/GridItem";
import { myFirebaseUrl } from "../../util/myFirebase";

const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("Update info on button");
  const [birthday, setBirthday] = useState("Update info on button");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const updatePosition = (newPosition) => {
    setPosition(newPosition);
  };
  const updateBirthday = (newBirthday) => {
    setBirthday(newBirthday);
  };

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const uid = JSON.parse(localStorage.getItem("userData")).uid;
      const response = await axios.get(
        myFirebaseUrl + "users/" + uid + ".json"
      );
      const data = response.data;

      setUserInfo({
        username: data.username,
        email: data.email,
      });
      data.position
        ? setPosition(data.position)
        : setPosition("Update info on button");
        
      data.birthday
      ? setBirthday(data.birthday)
      : setBirthday("Update info on button");
    } catch (error) {
      console.error(error);
    }
    finally{
      
    setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  let content = !isLoading ? (
    <Box
      sx={{
        flexGrow: 1,
        margin: "45px auto",
        textAlign: "center",
        width: "75%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Profile Info
      </Typography>

      <Grid
        container
        spacing={2}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="myFont"
            align="center"
            sx={{ fontWeight: "bold", color: "#9F4298" }}
          >
            Username
          </Typography>
          <GridItem>{userInfo.username}</GridItem>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="myFont"
            align="center"
            sx={{ fontWeight: "bold", color: "#9F4298" }}
          >
            Email
          </Typography>
          <GridItem>{userInfo.email}</GridItem>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="myFont"
            align="center"
            sx={{ fontWeight: "bold", color: "#9F4298" }}
          >
            Birthday
          </Typography>
          <GridItem>
            {birthday}
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="p"
            color="myFont"
            align="center"
            sx={{ fontWeight: "bold", color: "#9F4298" }}
          >
            Position
          </Typography>
          <GridItem>
            {position}
          </GridItem>
        </Grid>

        <Grid item xs={4}>
          <Button
            type="submit"
            variant="contained"
            color="purple"
            onClick={openUpdateModal}
            size="medium"
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
            Update your info :)
          </Button>
        </Grid>
      </Grid>
      {showUpdateModal ? (
        <UpdateProfileModal
          updatePosition={updatePosition}
          updateBirthday={updateBirthday}
          position={position}
          birthday={birthday}
          showThisUpdateModal={showUpdateModal}
          closeThisUpdateModal={closeUpdateModal}
          closeModalOnSubmit={closeUpdateModal}
        />
      ) : null}
    </Box>
  ) : (
    <div>Loading..</div>
  );

  return content;
};
export default ProfileCard;
