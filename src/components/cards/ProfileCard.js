import { Button, Stack, Grid, Box, Typography } from "@mui/material";
import * as React from "react";
import { useContext, useState } from "react";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import GridItem from "../UI/GridItem";
import UserDataContext from "../../store/userData-context";
import { useTranslation } from "react-i18next";

const ProfileCard = () => {
  const { t, i18n } = useTranslation();
  const lngs = {
    en: { nativeName: "English" },
    ba: { nativeName: "Bosanski" },
  };
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
        margin: "45px auto",
        width: "65%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        {t("profile.part1")}
      </Typography>

      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={0.2} alignItems="center">
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("register.part4")}
            </Typography>
            <GridItem>{ctxUserData.userUsername}</GridItem>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={0.2} alignItems="center">
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Email
            </Typography>
            <GridItem>{ctxUserData.userEmail}</GridItem>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={0.2} alignItems="center">
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("profile.part2")}
            </Typography>
            <GridItem>
              {ctxUserData.userBirthday
                ? ctxUserData.userBirthday
                : t("profile.part5")}
            </GridItem>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={0.2} alignItems="center">
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("profile.part3")}
            </Typography>
            <GridItem>
              {ctxUserData.userPosition
                ? ctxUserData.userPosition
                : t("profile.part5")}
            </GridItem>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            onClick={openUpdateModal}
            sx={{
              margin:'1rem',
              color: "#E6E7E8",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "2px solid #CFDB31",
              "&:hover": {
                backgroundColor: "green",
                border: "3px solid #9F4298",
              },
            }}
          >
            {t("profile.part4")}
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
      <Typography
        variant="h6"
        component="p"
        color='primary'
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Set your preference language:
      </Typography>
      <Stack direction={"row"} justifyContent={"center"}>
        {Object.keys(lngs).map((lng) => (
          <Button
            key={lng}
            sx={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
export default ProfileCard;
