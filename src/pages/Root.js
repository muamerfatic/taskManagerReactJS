import logo from "../logo.svg";
import { Box, Button,Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationModal from "../components/registration/RegistrationModal";
import LoginModal from "../components/login/LoginModal";
import { getAuthToken } from "../util/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";


const Root = () => {
  const { t ,i18n} = useTranslation();
  const lngs = {
    en: { nativeName: "English" },
    ba: { nativeName: "Bosanski" },
  };

  const navigate = useNavigate();

  const [showRegModal, setShowRegModal] = useState(false);
  const closeRegModal = () => {
    setShowRegModal(false);
  };
  const openRegModal = () => {
    setShowRegModal(true);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Container sx={{ textAlign: "center", margin: "auto" }}>
      <Stack direction={'row'}
      justifyContent={'flex-end'}
      
      >
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
      <Typography variant="h2" color={"#333333"}sx={{
      }}>
        <Trans i18nKey="welcomePage.part1">Welcome to TaskManager</Trans>
      </Typography>
      <img src={logo} className="App-logo" alt="logo" />
      <Container
        sx={{
          width:'75%',
          padding: "2.5% ",
          borderRadius: "30px",
          backgroundColor: "#9f4298",
          border: "3px solid #CFDB31",
          color: "#d1afd3",
        }}
      >
        <Typography variant="h6">
          {t("welcomePage.part2")}
        </Typography>
        <Typography variant="h6">
          
        {t("welcomePage.part3")}
        </Typography>
      </Container>
      <Button
        color="lightGray"
        variant="contained"
        onClick={openRegModal}
        size="large"
        sx={{
          backgroundColor: "#9F4298",
          fontWeight: "bolder",
          borderRadius: "12px",
          border: "3px solid #CFDB31",
          margin: "1rem",
          padding: "1rem",
          "&:hover": {
            backgroundColor: "green",
            border: "3px solid #9F4298",
          },
        }}
      >
      {t("welcomePage.part4")}
      </Button>
      {showRegModal ? (
        <RegistrationModal
          showThisRegModal={showRegModal}
          closeThisRegModal={closeRegModal}
        />
      ) : null}
      <Box>
        
      {t("welcomePage.part5")}
        <Button
          size="large"
          variant="text"
          onClick={openLoginModal}
          sx={{ fontWeight: "bolder" }}
        >
          
      {t("welcomePage.part6")}
        </Button>
        {showLoginModal ? (
          <LoginModal
            showThisLoginModal={showLoginModal}
            closeThisLoginModal={closeLoginModal}
            closeModalOnSubmit={closeLoginModal}
          />
        ) : null}
      </Box>
    </Container>
  );
};
export default Root;
