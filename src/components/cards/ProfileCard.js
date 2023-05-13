import { Button, Grid, Box, Typography } from "@mui/material";
import * as React from "react";
import { useContext, useState } from "react";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import GridItem from "../UI/GridItem";
import UserDataContext from "../../store/userData-context";

const ProfileCard = () => {
  const ctxUserData = useContext(UserDataContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  return (
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
          <GridItem>{ctxUserData.userUsername}</GridItem>
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
          <GridItem>{ctxUserData.userEmail}</GridItem>
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
            {ctxUserData.userBirthday
              ? ctxUserData.userBirthday
              : "Update info on button"}
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
            {ctxUserData.userPosition
              ? ctxUserData.userPosition
              : "Update info on button"}
          </GridItem>
        </Grid>

        <Grid item xs={12}>
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
          showThisUpdateModal={showUpdateModal}
          closeThisUpdateModal={closeUpdateModal}
          closeModalOnSubmit={closeUpdateModal}
        />
      ) : null}
    </Box>
  );
};
export default ProfileCard;
